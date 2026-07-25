// =============================================================================
// services/healthScore/getLatestHealthScore.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { HealthScoreBreakdown } from '@/types/financial';

/**
 * Returns the most recent health score snapshot for a group.
 * Returns null if no score has been computed yet.
 */
export async function getLatestHealthScore(
  groupId: string
): Promise<HealthScoreBreakdown | null> {
  const record = await db.healthScore.findFirst({
    where: { groupId },
    orderBy: { computedAt: 'desc' },
  });

  if (!record) return null;

  return {
    score: record.score,
    savingsComponent: Number(record.savingsComponent),
    repaymentComponent: Number(record.repaymentComponent),
    attendanceComponent: Number(record.attendanceComponent),
    governanceComponent: Number(record.governanceComponent),
    computedAt: record.computedAt,
  };
}
