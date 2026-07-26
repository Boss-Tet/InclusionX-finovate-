// =============================================================================
// services/savings/createContribution.ts
// Owned by: Jabari (Financial Logic)
// Creates a PENDING contribution row. Ledger write happens on approval.
// =============================================================================

import db from '@/lib/db';
import { CreateContributionInput } from '@/lib/validations/savings';
import { ContributionRecord } from '@/types/financial';

type CreateContributionArgs = CreateContributionInput & {
  recordedById: string; // User.id of the Treasurer logging this
};

/**
 * Inserts a new contribution record in PENDING status.
 * The Chairperson must approve before a ledger entry is written.
 */
export async function createContribution(
  args: CreateContributionArgs
): Promise<ContributionRecord> {
  const { groupId, memberId, amountTambala, method, cyclePeriod, recordedById } = args;

  const contribution = await db.contribution.create({
    data: {
      groupId,
      memberId,
      amountTambala,
      method,
      cyclePeriod: cyclePeriod ?? null,
      recordedById,
      status: 'PENDING',
    },
  });

  return contribution as ContributionRecord;
}
