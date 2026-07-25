// =============================================================================
// app/api/health-score/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/health-score?groupId= — latest score for one group
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleGetScore } from '@/controllers/healthScore/handleGetScore';
import { GetHealthScoreQuerySchema } from '@/lib/validations/healthScore';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = GetHealthScoreQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleGetScore(parsed.data.groupId);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[GET /api/health-score]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
