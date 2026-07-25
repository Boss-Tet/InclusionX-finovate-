// =============================================================================
// services/savings/getMemberBalance.ts
// Owned by: Jabari (Financial Logic)
// Computes a member's savings balance from APPROVED contributions.
// =============================================================================

import db from '@/lib/db';
import { MemberBalanceSummary } from '@/types/financial';

/**
 * Calculates a member's running savings balance within a group.
 * Balance = sum of all APPROVED contribution amounts for this GroupMember.
 */
export async function getMemberBalance(
  memberId: string,
  groupId: string
): Promise<MemberBalanceSummary> {
  const [approved, pending] = await Promise.all([
    db.contribution.aggregate({
      where: { memberId, groupId, status: 'APPROVED' },
      _sum: { amountTambala: true },
      _count: true,
    }),
    db.contribution.count({
      where: { memberId, groupId, status: 'PENDING' },
    }),
  ]);

  return {
    memberId,
    groupId,
    totalContributedTambala: approved._sum.amountTambala ?? 0,
    approvedContributions: approved._count,
    pendingContributions: pending,
  };
}
