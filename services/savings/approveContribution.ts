// =============================================================================
// services/savings/approveContribution.ts
// Owned by: Jabari (Financial Logic)
// Sets contribution status to APPROVED or REJECTED.
// Caller (controller) is responsible for writing the ledger entry BEFORE calling this.
// =============================================================================

import db from '@/lib/db';
import { ContributionRecord } from '@/types/financial';

interface ApproveContributionArgs {
  contributionId: string;
  approvedById: string; // User.id of the Chairperson
  action: 'APPROVE' | 'REJECT';
}

/**
 * Flips a contribution's status to APPROVED or REJECTED.
 * This must only be called after the ledger entry has been written
 * (on APPROVE) by the controller.
 */
export async function approveContribution(
  args: ApproveContributionArgs
): Promise<ContributionRecord> {
  const { contributionId, approvedById, action } = args;

  const updated = await db.contribution.update({
    where: { id: contributionId },
    data: {
      status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED',
      approvedById,
    },
  });

  return updated as ContributionRecord;
}
