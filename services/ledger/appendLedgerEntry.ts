// =============================================================================
// services/ledger/appendLedgerEntry.ts
// Owned by: Jabari (Financial Logic)
//
// THE most critical function in the entire financial backend.
// This is the ONLY place that inserts into ledger_entries.
// Called after every approved contribution, loan disbursal,
// repayment, and withdrawal payout.
//
// RULE: No UPDATE. No DELETE. Corrections = appendReversal.ts only.
// =============================================================================

import db from '@/lib/db';
import { LedgerEntryType, LedgerDirection } from '@/types/financial';

interface AppendLedgerEntryInput {
  groupId: string;
  entryType: LedgerEntryType;
  /** Polymorphic FK: contribution.id / loan.id / loan_repayment.id / withdrawal_request.id */
  referenceId: string;
  amountTambala: number;
  direction: LedgerDirection;
  reason?: string;
}

/**
 * Appends an immutable ledger entry and updates the running group balance.
 * This function must be called (and awaited) inside every money-moving action
 * before the action is considered committed.
 */
export async function appendLedgerEntry(
  input: AppendLedgerEntryInput
): Promise<string> {
  const { groupId, entryType, referenceId, amountTambala, direction, reason } = input;

  // 1. Compute the running balance after this entry.
  //    Read the most recent ledger entry for this group to get balanceAfter.
  const lastEntry = await db.ledgerEntry.findFirst({
    where: { groupId },
    orderBy: { createdAt: 'desc' },
    select: { balanceAfter: true },
  });

  const previousBalance = lastEntry?.balanceAfter ?? 0;
  const balanceAfter =
    direction === 'CREDIT'
      ? previousBalance + amountTambala
      : previousBalance - amountTambala;

  // 2. Insert the new ledger row.
  const entry = await db.ledgerEntry.create({
    data: {
      groupId,
      entryType,
      referenceId,
      amountTambala,
      direction,
      balanceAfter,
      reason: reason ?? null,
    },
    select: { id: true },
  });

  return entry.id;
}
