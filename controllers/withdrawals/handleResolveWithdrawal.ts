// =============================================================================
// controllers/withdrawals/handleResolveWithdrawal.ts
// Owned by: Jabari (Financial Logic)
//
// Called after every withdrawal vote to check if quorum has been reached.
// Quorum formula: ceil(activeMembers × group.withdrawalQuorumPct / 100)
//
// Resolution logic:
//   - If (approveCount + rejectCount) >= quorumNeeded AND approveCount >= quorumNeeded
//     → APPROVED → write WITHDRAWAL ledger DEBIT → trigger health score recompute
//   - If rejectCount makes approve impossible (activeMembers - rejectCount < quorumNeeded)
//     → REJECTED early
//   - Otherwise → no change (still collecting votes)
// =============================================================================

import db from '@/lib/db';
import { resolveWithdrawal } from '@/services/withdrawals/resolveWithdrawal';
import { getWithdrawalVotes } from '@/services/withdrawals/getWithdrawalVotes';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { ApiResponse, WithdrawalRequestRecord } from '@/types/financial';

export async function handleResolveWithdrawal(
  requestId: string
): Promise<ApiResponse<{ resolved: boolean; request: WithdrawalRequestRecord }>> {
  // Load request + group config.
  const request = await db.withdrawalRequest.findUnique({
    where: { id: requestId },
    include: { group: { select: { withdrawalQuorumPct: true } } },
  });
  if (!request) return { success: false, error: 'Request not found.', code: 'NOT_FOUND' };
  if (request.status !== 'PENDING') {
    return { success: false, error: `Request already ${request.status}.`, code: 'INVALID_STATE' };
  }

  // Count active members in the group.
  const activeMembers = await db.groupMember.count({
    where: { groupId: request.groupId, status: 'ACTIVE' },
  });

  const quorumPct = Number(request.group.withdrawalQuorumPct);
  const quorumNeeded = Math.ceil((activeMembers * quorumPct) / 100);

  const votes = await getWithdrawalVotes(requestId);
  const approveCount = votes.filter((v) => v.decision === 'APPROVE').length;
  const rejectCount = votes.filter((v) => v.decision === 'REJECT').length;
  const totalVotes = approveCount + rejectCount;

  // Check early rejection: enough rejections that approve is now impossible.
  const maxPossibleApprove = activeMembers - rejectCount;
  if (maxPossibleApprove < quorumNeeded) {
    const updated = await resolveWithdrawal({ requestId, outcome: 'REJECTED' });
    return { success: true, data: { resolved: true, request: updated } };
  }

  // Check approval quorum reached.
  if (approveCount >= quorumNeeded) {
    // Write DEBIT ledger entry.
    await appendLedgerEntry({
      groupId: request.groupId,
      entryType: 'WITHDRAWAL',
      referenceId: request.id,
      amountTambala: request.amountTambala,
      direction: 'DEBIT',
    });

    const updated = await resolveWithdrawal({ requestId, outcome: 'APPROVED' });

    // Recompute health score.
    computeHealthScore(request.groupId)
      .then((b) => saveHealthScore(request.groupId, b))
      .catch(console.error);

    return { success: true, data: { resolved: true, request: updated } };
  }

  // Not yet resolved.
  return {
    success: true,
    data: { resolved: false, request: request as unknown as WithdrawalRequestRecord },
  };
}
