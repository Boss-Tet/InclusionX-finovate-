// =============================================================================
// controllers/withdrawals/handleRequestWithdrawal.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Member must be ACTIVE
//   2. No other PENDING withdrawal for this member in this group
//   3. Amount must not exceed the group's current ledger balance
// =============================================================================

import db from '@/lib/db';
import { createWithdrawalRequest } from '@/services/withdrawals/createWithdrawalRequest';
import { RequestWithdrawalInput } from '@/lib/validations/withdrawals';
import { ApiResponse, WithdrawalRequestRecord } from '@/types/financial';

type HandleRequestWithdrawalArgs = RequestWithdrawalInput & {
  callerMemberId: string; // GroupMember.id — must match memberId
};

export async function handleRequestWithdrawal(
  args: HandleRequestWithdrawalArgs
): Promise<ApiResponse<WithdrawalRequestRecord>> {
  const { groupId, memberId, amountTambala, reason, callerMemberId } = args;

  if (callerMemberId !== memberId) {
    return { success: false, error: 'You can only submit a withdrawal for yourself.', code: 'FORBIDDEN' };
  }

  // Check membership is active.
  const membership = await db.groupMember.findFirst({
    where: { id: memberId, groupId, status: 'ACTIVE' },
    select: { id: true },
  });
  if (!membership) {
    return { success: false, error: 'Member is not active in this group.', code: 'FORBIDDEN' };
  }

  // Check for duplicate pending request.
  const existing = await db.withdrawalRequest.findFirst({
    where: { groupId, memberId, status: 'PENDING' },
    select: { id: true },
  });
  if (existing) {
    return { success: false, error: 'You already have a pending withdrawal request.', code: 'CONFLICT' };
  }

  // BUG-09 FIX: Subtract the sum of all currently PENDING withdrawal amounts
  // from the group balance before checking. Two concurrent requests can both
  // read the same balance and both pass; this committed-amount reservation
  // prevents over-commitment of the pool.
  const lastEntry = await db.ledgerEntry.findFirst({
    where: { groupId },
    orderBy: { createdAt: 'desc' },
    select: { balanceAfter: true },
  });
  const groupBalance = lastEntry?.balanceAfter ?? 0;

  const pendingSum = await db.withdrawalRequest.aggregate({
    where: { groupId, status: 'PENDING' },
    _sum: { amountTambala: true },
  });
  const committedAmount = pendingSum._sum.amountTambala ?? 0;
  const availableBalance = groupBalance - committedAmount;

  if (amountTambala > availableBalance) {
    return {
      success: false,
      error: `Withdrawal amount (${amountTambala}) exceeds available group balance (${availableBalance}). ${committedAmount > 0 ? `(${committedAmount} tambala is reserved by other pending requests)` : ''}`,
      code: 'INSUFFICIENT_FUNDS',
    };
  }

  const request = await createWithdrawalRequest({ groupId, memberId, amountTambala, reason });
  return { success: true, data: request };
}
