// =============================================================================
// services/loans/getRepaymentsByLoan.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { RepaymentRecord } from '@/types/financial';

/**
 * Returns all repayment instalments for a given loan, oldest first.
 */
export async function getRepaymentsByLoan(loanId: string): Promise<RepaymentRecord[]> {
  const repayments = await db.loanRepayment.findMany({
    where: { loanId },
    orderBy: { paidAt: 'asc' },
  });
  return repayments as RepaymentRecord[];
}
