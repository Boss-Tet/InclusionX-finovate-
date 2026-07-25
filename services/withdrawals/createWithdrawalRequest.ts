// =============================================================================
// services/withdrawals/createWithdrawalRequest.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { WithdrawalRequestRecord } from '@/types/financial';

interface CreateWithdrawalRequestArgs {
  groupId: string;
  memberId: string;
  amountTambala: number;
  reason: string;
}

export async function createWithdrawalRequest(
  args: CreateWithdrawalRequestArgs
): Promise<WithdrawalRequestRecord> {
  const { groupId, memberId, amountTambala, reason } = args;

  const request = await db.withdrawalRequest.create({
    data: { groupId, memberId, amountTambala, reason, status: 'PENDING' },
  });

  return request as WithdrawalRequestRecord;
}
