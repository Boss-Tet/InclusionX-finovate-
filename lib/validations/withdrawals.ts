// =============================================================================
// lib/validations/withdrawals.ts
// Owned by: Jabari (Financial Logic)
// Zod schemas for withdrawal request and voting API bodies.
// =============================================================================

import { z } from 'zod';

/** POST /api/withdrawals — Member submits a withdrawal request */
export const RequestWithdrawalSchema = z.object({
  groupId: z.string().uuid({ message: 'groupId must be a valid UUID' }),
  memberId: z.string().uuid({ message: 'memberId must be a valid UUID (GroupMember.id)' }),
  amountTambala: z
    .number()
    .int({ message: 'amountTambala must be an integer' })
    .positive({ message: 'amountTambala must be greater than 0' }),
  reason: z
    .string()
    .min(10, { message: 'reason must be at least 10 characters' })
    .max(1000),
});

export type RequestWithdrawalInput = z.infer<typeof RequestWithdrawalSchema>;

/** POST /api/withdrawals/:id/vote — Any active group member votes */
export const CastWithdrawalVoteSchema = z.object({
  /** GroupMember.id of the voter */
  voterId: z.string().uuid({ message: 'voterId must be a valid UUID (GroupMember.id)' }),
  decision: z.enum(['APPROVE', 'REJECT']),
  note: z.string().max(500).optional(),
});

export type CastWithdrawalVoteInput = z.infer<typeof CastWithdrawalVoteSchema>;

/** GET /api/withdrawals — query params */
export const GetWithdrawalsQuerySchema = z.object({
  groupId: z.string().uuid(),
  memberId: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'PAID_OUT']).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type GetWithdrawalsQuery = z.infer<typeof GetWithdrawalsQuerySchema>;
