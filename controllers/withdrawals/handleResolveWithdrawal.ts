// =============================================================================
// controllers/withdrawals/handleResolveWithdrawal.ts
// Owned by: Jabari (Financial Logic)
//
// Called after every withdrawal vote to check if quorum has been reached.
// Quorum formula: ceil(activeMembers × group.withdrawalQuorumPct / 100)
//
// FIX BUG-03: ledger DEBIT + status flip in ONE db.$transaction.
// FIX BUG-10: removed unused `totalVotes` variable.
// =============================================================================

import db from '@/lib/db';
import { getWithdrawalVotes } from '@/services/withdrawals/getWithdrawalVotes';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { ApiResponse, WithdrawalRequestRecord } from '@/types/financial';

export async function handleResolveWithdrawal(
  requestId: string
): Promise<ApiResponse<{ resolved: boolean; request: WithdrawalRequestRecord }>> {
  // Load request + group config OUTSIDE transaction (read-only).
  const request = await db.withdrawalRequest.findUnique({
    where: { id: requestId },
    include: { group: { select: { withdrawalQuorumPct: true } } },
  });
  if (!request) return { success: false, error: 'Request not found.', code: 'NOT_FOUND' };
  if (request.status !== 'PENDING') {
    return { success: false, error: `Request already ${request.status}.`, code: 'INVALID_STATE' };
  }

  const activeMembers = await db.groupMember.count({
    where: { groupId: request.groupId, status: 'ACTIVE' },
  });

  const quorumPct = Number(request.group.withdrawalQuorumPct);
  const quorumNeeded = Math.ceil((activeMembers * quorumPct) / 100);

  const votes = await getWithdrawalVotes(requestId);
  const approveCount = votes.filter((v) => v.decision === 'APPROVE').length;
  const rejectCount = votes.filter((v) => v.decision === 'REJECT').length;
  // BUG-10 FIX: removed unused `totalVotes` variable.

  // Early rejection: enough rejections that approval is mathematically impossible.
  const maxPossibleApprove = activeMembers - rejectCount;
  if (maxPossibleApprove < quorumNeeded) {
    const updated = await db.withdrawalRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    });
    return { success: true, data: { resolved: true, request: updated as WithdrawalRequestRecord } };
  }

  // Approval quorum reached.
  if (approveCount >= quorumNeeded) {
    // BUG-03 FIX: ledger DEBIT + status flip in ONE atomic transaction.
    const updated = await db.$transaction(async (tx) => {
      await appendLedgerEntry(
        {
          groupId: request.groupId,
          entryType: 'WITHDRAWAL',
          referenceId: request.id,
          amountTambala: request.amountTambala,
          direction: 'DEBIT',
        },
        tx
      );

      return tx.withdrawalRequest.update({
        where: { id: requestId },
        data: { status: 'APPROVED' },
        // NOTE: paidOutAt is NOT set here — it's set by the PayChangu webhook
        // handler (Arthony) when status transitions to PAID_OUT.
      });
    });

    computeHealthScore(request.groupId)
      .then((b) => saveHealthScore(request.groupId, b))
      .catch(console.error);

    return { success: true, data: { resolved: true, request: updated as WithdrawalRequestRecord } };
  }

  // Not yet resolved — still collecting votes.
  return {
    success: true,
    data: { resolved: false, request: request as unknown as WithdrawalRequestRecord },
  };
}
