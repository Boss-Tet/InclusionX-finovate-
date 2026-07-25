// =============================================================================
// lib/validations/loans.ts
// Owned by: Jabari (Financial Logic)
// Zod schemas for loan lifecycle API request bodies.
// =============================================================================

import { z } from 'zod';

/** POST /api/loans — Member requests a loan */
export const RequestLoanSchema = z.object({
  groupId: z.string().uuid({ message: 'groupId must be a valid UUID' }),
  memberId: z.string().uuid({ message: 'memberId must be a valid UUID (GroupMember.id)' }),
  /** Requested principal in tambala */
  principalTambala: z
    .number()
    .int({ message: 'principalTambala must be an integer' })
    .positive({ message: 'principalTambala must be greater than 0' }),
  /** Optional due date override — if omitted, set by group cycle config */
  dueDate: z.string().datetime().optional(),
});

export type RequestLoanInput = z.infer<typeof RequestLoanSchema>;

/** POST /api/loans/:id/vote — Chairperson, Treasurer, or Secretary votes */
export const CastLoanVoteSchema = z.object({
  /** GroupMember.id of the voter */
  voterId: z.string().uuid({ message: 'voterId must be a valid UUID (GroupMember.id)' }),
  decision: z.enum(['APPROVE', 'REJECT']),
  /** Optional rejection reason */
  note: z.string().max(1000).optional(),
});

export type CastLoanVoteInput = z.infer<typeof CastLoanVoteSchema>;

/** POST /api/loans/:id/disburse — Treasurer marks loan as disbursed */
export const DisburseLoanSchema = z.object({
  method: z.enum(['CASH', 'MOBILE_MONEY', 'CARD']),
  /** PayChangu reference — required for MOBILE_MONEY / CARD */
  paychanguRef: z.string().max(100).optional(),
});

export type DisburseLoanInput = z.infer<typeof DisburseLoanSchema>;

/** POST /api/loans/:id/repay — Member makes a repayment instalment */
export const RepayLoanSchema = z.object({
  amountTambala: z
    .number()
    .int({ message: 'amountTambala must be an integer' })
    .positive({ message: 'amountTambala must be greater than 0' }),
  method: z.enum(['CASH', 'MOBILE_MONEY', 'CARD']),
  paychanguRef: z.string().max(100).optional(),
  /** Idempotency key — prevents duplicate repayments from webhook replays */
  idempotencyKey: z.string().max(100).optional(),
});

export type RepayLoanInput = z.infer<typeof RepayLoanSchema>;

/** GET /api/loans — query params */
export const GetLoansQuerySchema = z.object({
  groupId: z.string().uuid(),
  memberId: z.string().uuid().optional(),
  status: z
    .enum(['PENDING', 'APPROVED', 'REJECTED', 'DISBURSED', 'REPAYING', 'REPAID', 'OVERDUE'])
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type GetLoansQuery = z.infer<typeof GetLoansQuerySchema>;
