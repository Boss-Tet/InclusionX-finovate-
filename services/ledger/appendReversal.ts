// =============================================================================
// services/ledger/appendReversal.ts
// Owned by: Jabari (Financial Logic)
//
// Creates a REVERSAL entry that offsets a previous ledger entry.
// The only mechanism for correcting ledger mistakes (FR-LED.2).
// Requires a human-readable reason; direction is automatically inverted.
// =============================================================================

import db from '@/lib/db';
import { appendLedgerEntry } from './appendLedgerEntry';

interface AppendReversalInput {
  /** The ledger entry ID being reversed */
  reversalOfId: string;
  reason: string;
}

/**
 * Creates an offsetting REVERSAL entry for a given ledger_entries row.
 * The direction is inverted (CREDIT ↔ DEBIT) and the amount is identical.
 * Returns the new reversal entry's ID.
 */
export async function appendReversal(input: AppendReversalInput): Promise<string> {
  const { reversalOfId, reason } = input;

  // Fetch the original entry to mirror its values.
  const original = await db.ledgerEntry.findUniqueOrThrow({
    where: { id: reversalOfId },
    select: {
      groupId: true,
      referenceId: true,
      amountTambala: true,
      direction: true,
    },
  });

  // Invert the direction.
  const invertedDirection = original.direction === 'CREDIT' ? 'DEBIT' : 'CREDIT';

  const reversalId = await appendLedgerEntry({
    groupId: original.groupId,
    entryType: 'REVERSAL',
    referenceId: original.referenceId,
    amountTambala: original.amountTambala,
    direction: invertedDirection,
    reason,
  });

  // Link the new entry back to the original so it's queryable.
  await db.ledgerEntry.update({
    where: { id: reversalId },
    data: { reversalOfId },
  });

  return reversalId;
}
