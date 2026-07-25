// =============================================================================
// services/withdrawals/resolveWithdrawal.ts
// Owned by: Jabari (Financial Logic)
//
// Sets withdrawal status to APPROVED or REJECTED.
// The controller checks quorum and writes the ledger entry before calling this.
// =============================================================================

import db from '@/lib/db';
import { WithdrawalRequestRecord } from '@/types/financial';

interface ResolveWithdrawalArgs {
  requestId: string;
  outcome: 'APPROVED' | 'REJECTED';
}

/**
 * Flips a withdrawal request status to APPROVED or REJECTED.
 * Only called by handleResolveWithdrawal after quorum is confirmed.
 */
export async function resolveWithdrawal(
  args: ResolveWithdrawalArgs
): Promise<WithdrawalRequestRecord> {
  const { requestId, outcome } = args;

  const updated = await db.withdrawalRequest.update({
    where: { id: requestId },
    data: {
      status: outcome,
      // NOTE: paidOutAt is intentionally NOT set here.
      // paidOutAt is only set when status → PAID_OUT (after PayChangu confirms the payout).
      // That transition is handled by Arthony's webhook handler, not this service.
    },
  });

  return updated as WithdrawalRequestRecord;
}
