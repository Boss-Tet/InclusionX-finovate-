// =============================================================================
// services/withdrawals/getWithdrawalById.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { WithdrawalRequestRecord } from '@/types/financial';

export async function getWithdrawalById(
  id: string
): Promise<WithdrawalRequestRecord | null> {
  const wr = await db.withdrawalRequest.findUnique({
    where: { id },
    include: { votes: true },
  });
  return wr as WithdrawalRequestRecord | null;
}
