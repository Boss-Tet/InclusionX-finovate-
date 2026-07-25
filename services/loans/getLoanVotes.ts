// =============================================================================
// services/loans/getLoanVotes.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { LoanVoteRecord } from '@/types/financial';

/**
 * Returns all votes cast so far for a given loan.
 */
export async function getLoanVotes(loanId: string): Promise<LoanVoteRecord[]> {
  const votes = await db.loanVote.findMany({
    where: { loanId },
    orderBy: { votedAt: 'asc' },
  });
  return votes as LoanVoteRecord[];
}
