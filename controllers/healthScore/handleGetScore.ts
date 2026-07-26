// =============================================================================
// controllers/healthScore/handleGetScore.ts
// Owned by: Jabari (Financial Logic)
// GET /api/health-score?groupId=
// =============================================================================

import { getLatestHealthScore } from '@/services/healthScore/getLatestHealthScore';
import { ApiResponse, HealthScoreBreakdown } from '@/types/financial';

export async function handleGetScore(
  groupId: string
): Promise<ApiResponse<HealthScoreBreakdown | null>> {
  const score = await getLatestHealthScore(groupId);
  return { success: true, data: score };
}
