// =============================================================================
// controllers/withdrawals/handleCastWithdrawalVote.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Any ACTIVE group member may vote (not just officers)
//   2. Request must be in PENDING status
//   3. No double-vote — DB unique constraint; catch P2002
//   4. After each vote, evaluate quorum and resolve if reached
// =============================================================================

import db from '@/lib/db';
import { castWithdrawalVote } from '@/services/withdrawals/castWithdrawalVote';
import { CastWithdrawalVoteInput } from '@/lib/validations/withdrawals';
import { ApiResponse, WithdrawalVoteRecord } from '@/types/financial';

interface HandleCastWithdrawalVoteArgs extends CastWithdrawalVoteInput {
  requestId: string;
}

export async function handleCastWithdrawalVote(
  args: HandleCastWithdrawalVoteArgs
): Promise<ApiResponse<WithdrawalVoteRecord>> {
  const { requestId, voterId, decision, note } = args;

  // Validate request exists and is PENDING.
  const request = await db.withdrawalRequest.findUnique({
    where: { id: requestId },
    select: { status: true },
  });
  if (!request) return { success: false, error: 'Withdrawal request not found.', code: 'NOT_FOUND' };
  if (request.status !== 'PENDING') {
    return { success: false, error: `Cannot vote on a request with status ${request.status}.`, code: 'INVALID_STATE' };
  }

  // Validate voter is an active member of the group.
  const voter = await db.groupMember.findUnique({
    where: { id: voterId },
    select: { status: true },
  });
  if (!voter || voter.status !== 'ACTIVE') {
    return { success: false, error: 'Voter is not an active member of this group.', code: 'FORBIDDEN' };
  }

  try {
    const vote = await castWithdrawalVote({ requestId, voterId, decision, note });
    return { success: true, data: vote };
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return { success: false, error: 'You have already voted on this request.', code: 'DUPLICATE_VOTE' };
    }
    throw err;
  }
}
