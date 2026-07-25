// =============================================================================
// services/healthScore/saveHealthScore.ts
// Owned by: Jabari (Financial Logic)
// Persists a computed HealthScoreBreakdown snapshot to the health_scores table.
// =============================================================================

import db from '@/lib/db';
import { HealthScoreBreakdown } from '@/types/financial';

export async function saveHealthScore(
  groupId: string,
  breakdown: HealthScoreBreakdown
): Promise<string> {
  const record = await db.healthScore.create({
    data: {
      groupId,
      score: breakdown.score,
      savingsComponent: breakdown.savingsComponent,
      repaymentComponent: breakdown.repaymentComponent,
      attendanceComponent: breakdown.attendanceComponent,
      governanceComponent: breakdown.governanceComponent,
    },
    select: { id: true },
  });
  return record.id;
}
