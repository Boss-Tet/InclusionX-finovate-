// =============================================================================
// services/healthScore/getAllGroupScores.ts
// Owned by: Jabari (Financial Logic)
//
// Returns the latest health score for every ACTIVE group.
// Used by the National Bank Officer dashboard (FR-BANK.1).
// =============================================================================

import db from '@/lib/db';
import { GroupHealthSummary } from '@/types/financial';

/**
 * Fetches latest health score for all active groups.
 * Returns groups even if they have no score yet (score will be null).
 */
export async function getAllGroupScores(): Promise<GroupHealthSummary[]> {
  const groups = await db.vslaGroup.findMany({
    where: { status: 'ACTIVE' },
    select: {
      id: true,
      name: true,
      members: { where: { status: 'ACTIVE' }, select: { id: true } },
      healthScores: {
        orderBy: { computedAt: 'desc' },
        take: 1,
        select: {
          score: true,
          savingsComponent: true,
          repaymentComponent: true,
          attendanceComponent: true,
          governanceComponent: true,
          computedAt: true,
        },
      },
    },
  });

  return groups.map((g) => {
    const latest = g.healthScores[0] ?? null;
    return {
      groupId: g.id,
      groupName: g.name,
      memberCount: g.members.length,
      latestScore: latest
        ? {
            score: latest.score,
            savingsComponent: Number(latest.savingsComponent),
            repaymentComponent: Number(latest.repaymentComponent),
            attendanceComponent: Number(latest.attendanceComponent),
            governanceComponent: Number(latest.governanceComponent),
            computedAt: latest.computedAt,
          }
        : null,
    };
  });
}
