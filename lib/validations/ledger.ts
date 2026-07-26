// =============================================================================
// lib/validations/ledger.ts
// Owned by: Jabari (Financial Logic)
// Zod schemas for ledger query API.
// =============================================================================

import { z } from 'zod';

/** GET /api/ledger — query params for paginated ledger view */
export const GetLedgerQuerySchema = z.object({
  groupId: z.string().uuid({ message: 'groupId must be a valid UUID' }),
  /** ISO datetime string — inclusive lower bound */
  from: z.string().datetime().optional(),
  /** ISO datetime string — inclusive upper bound */
  to: z.string().datetime().optional(),
  entryType: z
    .enum([
      'CONTRIBUTION',
      'LOAN_DISBURSEMENT',
      'LOAN_REPAYMENT',
      'WITHDRAWAL',
      'REVERSAL',
      'MEMBER_SUSPENDED',
      'MEMBER_REMOVED',
    ])
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(200).default(50),
});

export type GetLedgerQuery = z.infer<typeof GetLedgerQuerySchema>;
