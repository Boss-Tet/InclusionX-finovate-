// =============================================================================
// lib/validations/healthScore.ts
// Owned by: Jabari (Financial Logic)
// Zod schemas for health score API.
// =============================================================================

import { z } from 'zod';

/** POST /api/health-score/compute — trigger a recompute for a group */
export const ComputeHealthScoreSchema = z.object({
  groupId: z.string().uuid({ message: 'groupId must be a valid UUID' }),
});

export type ComputeHealthScoreInput = z.infer<typeof ComputeHealthScoreSchema>;

/** GET /api/health-score — query params */
export const GetHealthScoreQuerySchema = z.object({
  groupId: z.string().uuid({ message: 'groupId must be a valid UUID' }),
});

export type GetHealthScoreQuery = z.infer<typeof GetHealthScoreQuerySchema>;

/** GET /api/health-score/:groupId/trend — historical snapshots */
export const GetHealthScoreTrendQuerySchema = z.object({
  /** Number of past snapshots to return */
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export type GetHealthScoreTrendQuery = z.infer<typeof GetHealthScoreTrendQuerySchema>;
