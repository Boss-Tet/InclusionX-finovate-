// =============================================================================
// services/ledger/getLedgerByGroup.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { PaginatedLedger } from '@/types/financial';

interface GetLedgerByGroupInput {
  groupId: string;
  from?: Date;
  to?: Date;
  entryType?: string;
  page: number;
  pageSize: number;
}

/**
 * Returns a paginated list of ledger entries for a group,
 * ordered newest-first. Bank Officers and Treasurers read from here.
 * The Health Score engine reads directly from source tables — not this fn.
 */
export async function getLedgerByGroup(
  input: GetLedgerByGroupInput
): Promise<PaginatedLedger> {
  const { groupId, from, to, entryType, page, pageSize } = input;

  const where = {
    groupId,
    ...(from || to
      ? {
          createdAt: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {}),
          },
        }
      : {}),
    ...(entryType ? { entryType: entryType as any } : {}),
  };

  const [entries, total] = await Promise.all([
    db.ledgerEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.ledgerEntry.count({ where }),
  ]);

  return { entries: entries as any, total, page, pageSize };
}
