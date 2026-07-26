// =============================================================================
// services/ledger/appendReversal.ts
// Owned by: Jabari (Financial Logic)
//
// FIX BUG-02: Removed the illegal db.ledgerEntry.update() call.
// reversalOfId is now passed to appendLedgerEntry and written on INSERT,
// maintaining the append-only invariant of ledger_entries.
// =============================================================================

import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { appendLedgerEntry } from './appendLedgerEntry';

interface AppendReversalInput {
  /** The ledger entry ID being reversed */
  reversalOfId: string;
  reason: string;
}

/**
 * Creates an offsetting REVERSAL entry for a given ledger_entries row.
 * Direction is inverted (CREDIT ↔ DEBIT). reversalOfId is set on insert — never updated.
 * Returns the new reversal entry's ID.
 */
export async function appendReversal(
  input: AppendReversalInput,
  txClient?: Prisma.TransactionClient
): Promise<string> {
  const { reversalOfId, reason } = input;

  const client = txClient ?? db;

  // Fetch the original entry to mirror its values.
  const original = await client.ledgerEntry.findUniqueOrThrow({
    where: { id: reversalOfId },
    select: {
      groupId: true,
      referenceId: true,
      amountTambala: true,
      direction: true,
    },
  });

  const invertedDirection = original.direction === 'CREDIT' ? 'DEBIT' : 'CREDIT';

  // Pass reversalOfId directly to appendLedgerEntry — no UPDATE needed after insert.
  const reversalId = await appendLedgerEntry(
    {
      groupId: original.groupId,
      entryType: 'REVERSAL',
      referenceId: original.referenceId,
      amountTambala: original.amountTambala,
      direction: invertedDirection,
      reason,
      reversalOfId, // ← set on CREATE, never patched afterwards
    },
    txClient
  );

  return reversalId;
}
