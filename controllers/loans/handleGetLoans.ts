// =============================================================================
// controllers/loans/handleGetLoans.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import { getLoansByGroup } from '@/services/loans/getLoansByGroup';
import { getLoansByMember } from '@/services/loans/getLoansByMember';
import { GetLoansQuery } from '@/lib/validations/loans';
import { ApiResponse } from '@/types/financial';

export async function handleGetLoans(
  query: GetLoansQuery
): Promise<ApiResponse<Awaited<ReturnType<typeof getLoansByGroup>>>> {
  if (query.memberId) {
    const loans = await getLoansByMember(query.memberId, query.groupId);
    return { success: true, data: { loans, total: loans.length, page: 1, pageSize: loans.length } };
  }

  const result = await getLoansByGroup({
    groupId: query.groupId,
    status: query.status,
    page: query.page,
    pageSize: query.pageSize,
  });
  return { success: true, data: result };
}
