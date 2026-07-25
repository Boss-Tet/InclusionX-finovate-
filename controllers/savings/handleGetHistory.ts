// =============================================================================
// controllers/savings/handleGetHistory.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import { getContributionHistory } from '@/services/savings/getContributionHistory';
import { GetSavingsQuery } from '@/lib/validations/savings';
import { ApiResponse } from '@/types/financial';

export async function handleGetHistory(
  query: GetSavingsQuery
): Promise<ApiResponse<Awaited<ReturnType<typeof getContributionHistory>>>> {
  const result = await getContributionHistory({
    groupId: query.groupId,
    memberId: query.memberId,
    page: query.page,
    pageSize: query.pageSize,
  });
  return { success: true, data: result };
}
