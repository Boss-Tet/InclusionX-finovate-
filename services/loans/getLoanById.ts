// =============================================================================
// services/loans/getLoanById.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { LoanWithVotes } from '@/types/financial';

/**
 * Fetches a single loan by ID, including all votes cast so far.
 * Returns null if not found.
 */
export async function getLoanById(loanId: string): Promise<LoanWithVotes | null> {
  const loan = await db.loan.findUnique({
    where: { id: loanId },
    include: { votes: true, repayments: true },
  });

  if (!loan) return null;

  const remainingDueTambala = loan.totalDueTambala != null
    ? loan.totalDueTambala - loan.amountRepaidTambala
    : loan.principalTambala - loan.amountRepaidTambala;

  return {
    ...(loan as any),
    remainingDueTambala: Math.max(remainingDueTambala, 0),
  };
}
