// =============================================================================
// app/api/health-score/[groupId]/trend/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/health-score/:groupId/trend?limit= — historical score snapshots
// Used by the Bank Officer dashboard trend chart (FR-BANK.3)
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleGetScoreTrend } from '@/controllers/healthScore/handleGetScoreTrend';
import { GetHealthScoreTrendQuerySchema } from '@/lib/validations/healthScore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await params;
    const { searchParams } = new URL(req.url);
    const parsed = GetHealthScoreTrendQuerySchema.safeParse(
      Object.fromEntries(searchParams.entries())
    );
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await handleGetScoreTrend(groupId, parsed.data.limit);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[GET /api/health-score/:groupId/trend]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
