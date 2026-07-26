// =============================================================================
// services/savings/getContributionHistory.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { ContributionRecord } from '@/types/financial';

interface GetContributionHistoryArgs {
  groupId: string;
  memberId?: string;
  page: number;
  pageSize: number;
}

interface PaginatedContributions {
  contributions: ContributionRecord[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Returns paginated contribution history for a group (or filtered to one member).
 */
export async function getContributionHistory(
  args: GetContributionHistoryArgs
): Promise<PaginatedContributions> {
  const { groupId, memberId, page, pageSize } = args;

  const where = {
    groupId,
    ...(memberId ? { memberId } : {}),
  };

  const [contributions, total] = await Promise.all([
    db.contribution.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.contribution.count({ where }),
  ]);

  return { contributions: contributions as ContributionRecord[], total, page, pageSize };
}
