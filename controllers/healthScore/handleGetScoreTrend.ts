// =============================================================================
// controllers/healthScore/handleGetScoreTrend.ts
// Owned by: Jabari (Financial Logic)
// GET /api/health-score/:groupId/trend
// =============================================================================

import { getHealthScoreHistory } from '@/services/healthScore/getHealthScoreHistory';
import { ApiResponse, HealthScoreBreakdown } from '@/types/financial';

export async function handleGetScoreTrend(
  groupId: string,
  limit: number = 10
): Promise<ApiResponse<HealthScoreBreakdown[]>> {
  const history = await getHealthScoreHistory(groupId, limit);
  return { success: true, data: history };
}
