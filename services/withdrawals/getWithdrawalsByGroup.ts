// =============================================================================
// services/withdrawals/getWithdrawalsByGroup.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { WithdrawalRequestRecord } from '@/types/financial';

interface GetWithdrawalsByGroupArgs {
  groupId: string;
  memberId?: string;
  status?: string;
  page: number;
  pageSize: number;
}

interface PaginatedWithdrawals {
  withdrawals: WithdrawalRequestRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getWithdrawalsByGroup(
  args: GetWithdrawalsByGroupArgs
): Promise<PaginatedWithdrawals> {
  const { groupId, memberId, status, page, pageSize } = args;

  const where = {
    groupId,
    ...(memberId ? { memberId } : {}),
    ...(status ? { status: status as any } : {}),
  };

  const [withdrawals, total] = await Promise.all([
    db.withdrawalRequest.findMany({
      where,
      include: { votes: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.withdrawalRequest.count({ where }),
  ]);

  return {
    withdrawals: withdrawals as WithdrawalRequestRecord[],
    total,
    page,
    pageSize,
  };
}
