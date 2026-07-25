// =============================================================================
// controllers/loans/handleDisburseLoan.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Loan status must be APPROVED (not DISBURSED, PENDING, etc.)
//   2. Write ledger DEBIT entry first, then flip status to DISBURSED
//   3. Trigger Health Score recompute (fire-and-forget)
// =============================================================================

import db from '@/lib/db';
import { disburseLoan } from '@/services/loans/disburseLoan';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { DisburseLoanInput } from '@/lib/validations/loans';
import { ApiResponse, LoanRecord } from '@/types/financial';

interface HandleDisburseLoanArgs extends DisburseLoanInput {
  loanId: string;
  /** GroupMember.roleInGroup — must be GroupRole.TREASURER (NOT User.platformRole) */
  callerGroupRole: string;
}

export async function handleDisburseLoan(
  args: HandleDisburseLoanArgs
): Promise<ApiResponse<LoanRecord>> {
  const { loanId, method, paychanguRef, callerGroupRole } = args;

  // Group-role guard — reads GroupMember.roleInGroup, not User.platformRole.
  if (callerGroupRole !== 'TREASURER') {
    return { success: false, error: 'Only a Treasurer can disburse a loan.', code: 'FORBIDDEN' };
  }

  // Load loan and validate status.
  const loan = await db.loan.findUnique({
    where: { id: loanId },
    select: { id: true, status: true, groupId: true, principalTambala: true },
  });
  if (!loan) return { success: false, error: 'Loan not found.', code: 'NOT_FOUND' };
  if (loan.status !== 'APPROVED') {
    return { success: false, error: `Loan must be APPROVED before disbursement. Current status: ${loan.status}.`, code: 'INVALID_STATE' };
  }

  // Write DEBIT ledger entry first.
  await appendLedgerEntry({
    groupId: loan.groupId,
    entryType: 'LOAN_DISBURSEMENT',
    referenceId: loan.id,
    amountTambala: loan.principalTambala,
    direction: 'DEBIT',
  });

  // Flip loan status.
  const updated = await disburseLoan({ loanId, paychanguRef });

  // Recompute health score (fire-and-forget).
  computeHealthScore(loan.groupId)
    .then((b) => saveHealthScore(loan.groupId, b))
    .catch(console.error);

  return { success: true, data: updated };
}
