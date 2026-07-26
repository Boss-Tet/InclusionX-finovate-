// =============================================================================
// controllers/loans/handleRepayLoan.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Loan must be DISBURSED or REPAYING
//   2. Repayment must not exceed remaining balance
//   3. Ledger CREDIT + instalment insert + amountRepaid increment atomically (FIX BUG-03)
//   4. Mark REPAID when balance is cleared
//   5. Trigger Health Score recompute
//
// FIX BUG-03: All three DB writes are inside ONE db.$transaction.
// =============================================================================

import db from '@/lib/db';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { RepayLoanInput } from '@/lib/validations/loans';
import { ApiResponse } from '@/types/financial';
import { LOAN_RULES } from '@/config/loanRules';

type HandleRepayLoanArgs = RepayLoanInput & {
  loanId: string;
  /** GroupMember.id of the caller — must be the loan owner */
  callerMemberId: string;
};

export async function handleRepayLoan(
  args: HandleRepayLoanArgs
): Promise<ApiResponse<{ loanStatus: string; remainingDueTambala: number }>> {
  const { loanId, amountTambala, method, paychanguRef, idempotencyKey, callerMemberId } = args;

  // Validate OUTSIDE transaction (no side effects).
  const loan = await db.loan.findUnique({
    where: { id: loanId },
    select: {
      id: true, status: true, groupId: true, memberId: true,
      totalDueTambala: true, amountRepaidTambala: true, principalTambala: true,
    },
  });
  if (!loan) return { success: false, error: 'Loan not found.', code: 'NOT_FOUND' };

  // Security: only the loan owner may submit repayments.
  if (loan.memberId !== callerMemberId) {
    return { success: false, error: 'You can only repay your own loan.', code: 'FORBIDDEN' };
  }

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

  // BUG-03 FIX: ledger write + repayment insert + loan update in ONE transaction.
  const { newRemaining, newStatus } = await db.$transaction(async (tx) => {
    // 1. Ledger CREDIT entry (passes tx so it shares this transaction).
    await appendLedgerEntry(
      {
        groupId: loan.groupId,
        entryType: 'LOAN_REPAYMENT',
        referenceId: loan.id,
        amountTambala,
        direction: 'CREDIT',
      },
      tx
    );

    // 2. Insert repayment instalment.
    await tx.loanRepayment.create({
      data: {
        loanId,
        amountTambala,
        method,
        idempotencyKey: idempotencyKey ?? null,
        paychanguRef: paychanguRef ?? null,
      },
    });

    // 3. Increment amountRepaidTambala and determine new status.
    const newAmountRepaid = alreadyRepaid + amountTambala;
    const computedRemaining = totalDue - newAmountRepaid;
    const resolvedStatus: 'REPAYING' | 'REPAID' = computedRemaining <= 0 ? 'REPAID' : 'REPAYING';

    await tx.loan.update({
      where: { id: loanId },
      data: {
        amountRepaidTambala: { increment: amountTambala },
        status: resolvedStatus,
        ...(resolvedStatus === 'REPAID' ? { repaidAt: new Date() } : {}),
      },
    });

    return { newRemaining: Math.max(computedRemaining, 0), newStatus: resolvedStatus };
  });

  // Recompute health score (fire-and-forget).
  computeHealthScore(loan.groupId)
    .then((b) => saveHealthScore(loan.groupId, b))
    .catch(console.error);

  return { success: true, data: { loanStatus: newStatus, remainingDueTambala: newRemaining } };
}
