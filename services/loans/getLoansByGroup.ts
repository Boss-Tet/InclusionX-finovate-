// =============================================================================
// services/loans/getLoansByGroup.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { LoanRecord } from '@/types/financial';

interface GetLoansByGroupArgs {
  groupId: string;
  status?: string;
  page: number;
  pageSize: number;
}

interface PaginatedLoans {
  loans: LoanRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getLoansByGroup(
  args: GetLoansByGroupArgs
): Promise<PaginatedLoans> {
  const { groupId, status, page, pageSize } = args;

  const where = {
    groupId,
    ...(status ? { status: status as any } : {}),
  };

  const [loans, total] = await Promise.all([
    db.loan.findMany({
      where,
      include: { votes: true },
      orderBy: { requestedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.loan.count({ where }),
  ]);

  return { loans: loans as unknown as LoanRecord[], total, page, pageSize };
}
