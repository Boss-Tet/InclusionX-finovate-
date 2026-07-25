// =============================================================================
// controllers/loans/handleRepayLoan.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Loan must be DISBURSED or REPAYING
//   2. Repayment amount must not exceed remaining balance
//   3. Write ledger CREDIT entry, then record repayment instalment
//   4. If amountRepaid + thisPayment >= totalDue → mark REPAID
//   5. Otherwise keep status as REPAYING
//   6. Trigger Health Score recompute
// =============================================================================

import db from '@/lib/db';
import { createRepayment } from '@/services/loans/createRepayment';
import { updateLoanStatus } from '@/services/loans/updateLoanStatus';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { RepayLoanInput } from '@/lib/validations/loans';
import { ApiResponse } from '@/types/financial';

interface HandleRepayLoanArgs extends RepayLoanInput {
  loanId: string;
}

export async function handleRepayLoan(
  args: HandleRepayLoanArgs
): Promise<ApiResponse<{ loanStatus: string; remainingDueTambala: number }>> {
  const { loanId, amountTambala, method, paychanguRef, idempotencyKey } = args;

  // Load loan.
  const loan = await db.loan.findUnique({
    where: { id: loanId },
    select: {
      id: true, status: true, groupId: true,
      totalDueTambala: true, amountRepaidTambala: true, principalTambala: true,
    },
  });
  if (!loan) return { success: false, error: 'Loan not found.', code: 'NOT_FOUND' };
  if (!['DISBURSED', 'REPAYING'].includes(loan.status)) {
    return { success: false, error: `Cannot repay a loan with status ${loan.status}.`, code: 'INVALID_STATE' };
  }

  const totalDue = loan.totalDueTambala ?? loan.principalTambala;
  const alreadyRepaid = loan.amountRepaidTambala;
  const remaining = totalDue - alreadyRepaid;

  if (amountTambala > remaining) {
    return {
      success: false,
      error: `Repayment (${amountTambala}) exceeds remaining balance (${remaining}).`,
      code: 'OVERPAYMENT',
    };
  }

  // Write ledger CREDIT entry first.
  await appendLedgerEntry({
    groupId: loan.groupId,
    entryType: 'LOAN_REPAYMENT',
    referenceId: loan.id,
    amountTambala,
    direction: 'CREDIT',
  });

  // Record the instalment (also increments amountRepaidTambala on loan).
  const { newAmountRepaidTambala } = await createRepayment({
    loanId,
    amountTambala,
    method,
    idempotencyKey,
    paychanguRef,
  });

  // Determine new status.
  const newRemaining = totalDue - newAmountRepaidTambala;
  let newStatus: 'REPAYING' | 'REPAID' = newRemaining <= 0 ? 'REPAID' : 'REPAYING';

  await updateLoanStatus({
    loanId,
    status: newStatus,
    ...(newStatus === 'REPAID' ? { repaidAt: new Date() } : {}),
  });

  // Recompute health score.
  computeHealthScore(loan.groupId)
    .then((b) => saveHealthScore(loan.groupId, b))
    .catch(console.error);

  return {
    success: true,
    data: { loanStatus: newStatus, remainingDueTambala: Math.max(newRemaining, 0) },
  };
}
