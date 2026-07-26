// =============================================================================
// controllers/healthScore/handleGetAllScores.ts
// Owned by: Jabari (Financial Logic)
// GET /api/health-score/all — Bank Officer view (FR-BANK.1)
//
// Pure PlatformRole guard — this endpoint is system-wide, not group-scoped.
// BANK_OFFICER and ADMIN are values of User.platformRole, not GroupMember.roleInGroup.
// =============================================================================

import { getAllGroupScores } from '@/services/healthScore/getAllGroupScores';
import { ApiResponse, GroupHealthSummary } from '@/types/financial';

/** PlatformRole values that may view all group scores (User.platformRole) */
const ALLOWED_PLATFORM_ROLES = ['BANK_OFFICER', 'ADMIN'] as const;

export async function handleGetAllScores(
  callerPlatformRole: string
): Promise<ApiResponse<GroupHealthSummary[]>> {
  if (!(ALLOWED_PLATFORM_ROLES as readonly string[]).includes(callerPlatformRole)) {
    return { success: false, error: 'Only a Bank Officer or Admin can view all group scores.', code: 'FORBIDDEN' };
  }

  const scores = await getAllGroupScores();
  return { success: true, data: scores };
}
