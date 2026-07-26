// =============================================================================
// services/withdrawals/getWithdrawalVotes.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { WithdrawalVoteRecord } from '@/types/financial';

export async function getWithdrawalVotes(
  requestId: string
): Promise<WithdrawalVoteRecord[]> {
  const votes = await db.withdrawalVote.findMany({
    where: { requestId },
    orderBy: { votedAt: 'asc' },
  });
  return votes as WithdrawalVoteRecord[];
}
