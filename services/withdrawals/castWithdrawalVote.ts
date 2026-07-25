// =============================================================================
// services/withdrawals/castWithdrawalVote.ts
// Owned by: Jabari (Financial Logic)
// The @@unique([requestId, voterId]) DB constraint prevents double votes.
// =============================================================================

import db from '@/lib/db';
import { WithdrawalVoteRecord } from '@/types/financial';

interface CastWithdrawalVoteArgs {
  requestId: string;
  voterId: string; // GroupMember.id
  decision: 'APPROVE' | 'REJECT';
  note?: string;
}

export async function castWithdrawalVote(
  args: CastWithdrawalVoteArgs
): Promise<WithdrawalVoteRecord> {
  const { requestId, voterId, decision, note } = args;

  const vote = await db.withdrawalVote.create({
    data: { requestId, voterId, decision, note: note ?? null },
  });

  return vote as WithdrawalVoteRecord;
}
