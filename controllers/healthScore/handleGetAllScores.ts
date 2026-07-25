// =============================================================================
// controllers/healthScore/handleGetAllScores.ts
// Owned by: Jabari (Financial Logic)
// GET /api/health-score/all — Bank Officer view (FR-BANK.1)
// =============================================================================

import { getAllGroupScores } from '@/services/healthScore/getAllGroupScores';
import { ApiResponse, GroupHealthSummary } from '@/types/financial';

const ALLOWED_ROLES = ['BANK_OFFICER', 'ADMIN'];

export async function handleGetAllScores(
  callerRole: string
): Promise<ApiResponse<GroupHealthSummary[]>> {
  if (!ALLOWED_ROLES.includes(callerRole)) {
    return { success: false, error: 'Only a Bank Officer or Admin can view all group scores.', code: 'FORBIDDEN' };
  }

  const scores = await getAllGroupScores();
  return { success: true, data: scores };
}
