// =============================================================================
// controllers/withdrawals/handleGetWithdrawals.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import { getWithdrawalsByGroup } from '@/services/withdrawals/getWithdrawalsByGroup';
import { GetWithdrawalsQuery } from '@/lib/validations/withdrawals';
import { ApiResponse } from '@/types/financial';

export async function handleGetWithdrawals(
  query: GetWithdrawalsQuery
): Promise<ApiResponse<Awaited<ReturnType<typeof getWithdrawalsByGroup>>>> {
  const result = await getWithdrawalsByGroup({
    groupId: query.groupId,
    memberId: query.memberId,
    status: query.status,
    page: query.page,
    pageSize: query.pageSize,
  });
  return { success: true, data: result };
}
