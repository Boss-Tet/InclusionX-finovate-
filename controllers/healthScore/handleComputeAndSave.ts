// =============================================================================
// controllers/healthScore/handleComputeAndSave.ts
// Owned by: Jabari (Financial Logic)
// POST /api/health-score/compute
// =============================================================================

import { computeHealthScore } from '@/services/healthScore/computeHealthScore';
import { saveHealthScore } from '@/services/healthScore/saveHealthScore';
import { ApiResponse, HealthScoreBreakdown } from '@/types/financial';

export async function handleComputeAndSave(
  groupId: string
): Promise<ApiResponse<HealthScoreBreakdown>> {
  const breakdown = await computeHealthScore(groupId);
  await saveHealthScore(groupId, breakdown);
  return { success: true, data: breakdown };
}
