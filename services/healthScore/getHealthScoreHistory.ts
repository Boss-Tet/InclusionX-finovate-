// =============================================================================
// services/healthScore/getHealthScoreHistory.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { HealthScoreBreakdown } from '@/types/financial';

/**
 * Returns the N most recent health score snapshots for a group (newest first).
 * Used for the trend chart on the Bank Officer dashboard.
 */
export async function getHealthScoreHistory(
  groupId: string,
  limit: number = 10
): Promise<HealthScoreBreakdown[]> {
  const records = await db.healthScore.findMany({
    where: { groupId },
    orderBy: { computedAt: 'desc' },
    take: limit,
  });

  return records.map((r) => ({
    score: r.score,
    savingsComponent: Number(r.savingsComponent),
    repaymentComponent: Number(r.repaymentComponent),
    attendanceComponent: Number(r.attendanceComponent),
    governanceComponent: Number(r.governanceComponent),
    computedAt: r.computedAt,
  }));
}
