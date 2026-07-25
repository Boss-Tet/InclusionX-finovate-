// =============================================================================
// controllers/savings/handleCreateContribution.ts
// Owned by: Jabari (Financial Logic)
//
// Business rule: Only a TREASURER (in-group role) can log a contribution.
// The contribution starts as PENDING — a Chairperson must approve it.
// =============================================================================

import { createContribution } from '@/services/savings/createContribution';
import { CreateContributionInput } from '@/lib/validations/savings';
import { ApiResponse, ContributionRecord } from '@/types/financial';

interface HandleCreateContributionArgs extends CreateContributionInput {
  /** GroupMember.roleInGroup of the caller — must be TREASURER */
  callerRole: string;
  /** User.id of the Treasurer logging the contribution */
  callerUserId: string;
}

export async function handleCreateContribution(
  args: HandleCreateContributionArgs
): Promise<ApiResponse<ContributionRecord>> {
  const { callerRole, callerUserId, ...input } = args;

  // Role guard — only Treasurer may log contributions.
  if (callerRole !== 'TREASURER') {
    return {
      success: false,
      error: 'Only a Treasurer can record a contribution.',
      code: 'FORBIDDEN',
    };
  }

  const contribution = await createContribution({
    ...input,
    recordedById: callerUserId,
  });

  return { success: true, data: contribution };
}
