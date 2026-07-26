// =============================================================================
// controllers/savings/handleCreateContribution.ts
// Owned by: Jabari (Financial Logic)
//
// Business rule: Only a GroupRole.TREASURER may log a contribution.
// Guard reads GroupMember.roleInGroup — NOT User.platformRole.
// The contribution starts as PENDING — a Chairperson must approve it.
// =============================================================================

import { createContribution } from '@/services/savings/createContribution';
import { CreateContributionInput } from '@/lib/validations/savings';
import { ApiResponse, ContributionRecord } from '@/types/financial';

interface HandleCreateContributionArgs extends CreateContributionInput {
  /** GroupMember.roleInGroup of the caller — must be GroupRole.TREASURER */
  callerGroupRole: string;
  /** User.id of the Treasurer logging the contribution */
  callerUserId: string;
}

export async function handleCreateContribution(
  args: HandleCreateContributionArgs
): Promise<ApiResponse<ContributionRecord>> {
  const { callerGroupRole, callerUserId, ...input } = args;

  // Group-role guard — only GroupRole.TREASURER may log contributions.
  if (callerGroupRole !== 'TREASURER') {
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
