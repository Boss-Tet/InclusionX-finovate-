// =============================================================================
// services/ledger/getLedgerEntry.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { LedgerEntryRecord } from '@/types/financial';

/**
 * Fetches a single ledger entry by its ID.
 * Returns null if not found.
 */
export async function getLedgerEntry(id: string): Promise<LedgerEntryRecord | null> {
  const entry = await db.ledgerEntry.findUnique({ where: { id } });
  return entry as LedgerEntryRecord | null;
}
