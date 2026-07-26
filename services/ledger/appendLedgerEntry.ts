// =============================================================================
// services/ledger/appendLedgerEntry.ts
// Owned by: Jabari (Financial Logic)
//
// THE only write path into ledger_entries. Append-only — no UPDATE, no DELETE.
//
// FIX BUG-01: The read (balanceAfter) and write (create) are now performed
//   inside the SAME transaction to prevent race conditions under concurrency.
//
// FIX BUG-02 (partial): Accepts optional `reversalOfId` so appendReversal
//   can set it on INSERT and never needs to UPDATE after the fact.
//
// Accepts an optional `txClient` (Prisma.TransactionClient). When provided,
// the caller's outer transaction is reused — enabling BUG-03 fix where
// controllers wrap ledger-write + status-flip in one atomic db.$transaction.
// =============================================================================

import db from '@/lib/db';
import { Prisma } from '@prisma/client';
import { LedgerEntryType, LedgerDirection } from '@/types/financial';

export interface AppendLedgerEntryInput {
  groupId: string;
  entryType: LedgerEntryType;
  /** Polymorphic FK: contribution.id / loan.id / loan_repayment.id / withdrawal_request.id */
  referenceId: string;
  amountTambala: number;
  direction: LedgerDirection;
  reason?: string;
  /** Non-null only for REVERSAL entries — set on insert, never updated after. */
  reversalOfId?: string;
}

/**
 * Appends an immutable ledger entry and computes the running group balance atomically.
 *
 * @param input     - Entry fields.
 * @param txClient  - Optional Prisma transaction client. If supplied, the caller's
 *                    transaction is reused so the ledger write and the status update
 *                    that follows it are committed together or rolled back together.
 *                    If omitted, a fresh serialisable transaction is created internally.
 */
export async function appendLedgerEntry(
  input: AppendLedgerEntryInput,
  txClient?: Prisma.TransactionClient
): Promise<string> {
  const { groupId, entryType, referenceId, amountTambala, direction, reason, reversalOfId } = input;

  const execute = async (tx: Prisma.TransactionClient) => {
    // Read the latest running balance INSIDE the transaction so no concurrent
    // writer can slip in between the read and the insert.
    const lastEntry = await tx.ledgerEntry.findFirst({
      where: { groupId },
      orderBy: { createdAt: 'desc' },
      select: { balanceAfter: true },
    });

    const previousBalance = lastEntry?.balanceAfter ?? 0;
    const balanceAfter =
      direction === 'CREDIT'
        ? previousBalance + amountTambala
        : previousBalance - amountTambala;

    const entry = await tx.ledgerEntry.create({
      data: {
        groupId,
        entryType,
        referenceId,
        amountTambala,
        direction,
        balanceAfter,
        reversalOfId: reversalOfId ?? null,
        reason: reason ?? null,
      },
      select: { id: true },
    });

    return entry.id;
  };

  // If caller provides a transaction client, reuse it (BUG-03 fix pattern).
  // Otherwise create our own serialisable transaction for concurrency safety (BUG-01 fix).
  if (txClient) {
    return execute(txClient);
  }

  return db.$transaction(execute, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
