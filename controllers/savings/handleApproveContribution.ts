// =============================================================================
// controllers/savings/handleApproveContribution.ts
// Owned by: Jabari (Financial Logic)
//
// Business rule: Only GroupRole.CHAIRPERSON may approve/reject a contribution.
// Guard reads GroupMember.roleInGroup — NOT User.platformRole.
// On APPROVE → write ledger entry FIRST, then flip status.
// Triggers a Health Score recompute.
//
// FIX BUG-03: ledger write + status flip now wrapped in one db.$transaction.
//   If the status update fails, the ledger entry is rolled back too.
// =============================================================================

import db from '@/lib/db';
import { appendLedgerEntry } from '@/services/ledger/appendLedgerEntry';
import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { ApiResponse, ContributionRecord } from '@/types/financial';

interface HandleApproveContributionArgs {
  contributionId: string;
  action: 'APPROVE' | 'REJECT';
  /** GroupMember.roleInGroup — must be GroupRole.CHAIRPERSON */
  callerGroupRole: string;
  callerUserId: string;
  reason?: string;
}

export async function handleApproveContribution(
  args: HandleApproveContributionArgs
): Promise<ApiResponse<ContributionRecord>> {
  const { contributionId, action, callerGroupRole, callerUserId } = args;

  // Group-role guard — reads GroupMember.roleInGroup, not User.platformRole.
  if (callerGroupRole !== 'CHAIRPERSON') {
    return {
      success: false,
      error: 'Only a group Chairperson can approve contributions.',
      code: 'FORBIDDEN',
    };
  }

  // Validate existence and state OUTSIDE the transaction (no side effects).
  const contribution = await db.contribution.findUnique({
    where: { id: contributionId },
    select: { id: true, status: true, groupId: true, amountTambala: true },
  });

  if (!contribution) {
    return { success: false, error: 'Contribution not found.', code: 'NOT_FOUND' };
  }
  if (contribution.status !== 'PENDING') {
    return {
      success: false,
      error: `Contribution is already ${contribution.status}.`,
      code: 'INVALID_STATE',
    };
  }

  // BUG-03 FIX: ledger write + status flip in ONE atomic transaction.
  const updated = await db.$transaction(async (tx) => {
    if (action === 'APPROVE') {
      // Pass tx so the ledger insert shares this transaction.
      await appendLedgerEntry(
        {
          groupId: contribution.groupId,
          entryType: 'CONTRIBUTION',
          referenceId: contribution.id,
          amountTambala: contribution.amountTambala,
          direction: 'CREDIT',
        },
        tx
      );
    }

    return tx.contribution.update({
      where: { id: contributionId },
      data: {
        status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
        approvedById: callerUserId,
      },
    });
  });

  // Health Score recompute (fire-and-forget — don't block response).
  computeHealthScore(contribution.groupId)
    .then((breakdown) => saveHealthScore(contribution.groupId, breakdown))
    .catch(console.error);

  return { success: true, data: updated as ContributionRecord };
}
