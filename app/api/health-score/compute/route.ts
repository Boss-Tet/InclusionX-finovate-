// =============================================================================
// app/api/health-score/compute/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/health-score/compute — trigger a fresh score computation for a group
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleComputeAndSave } from '@/controllers/healthScore/handleComputeAndSave';
import { ComputeHealthScoreSchema } from '@/lib/validations/healthScore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ComputeHealthScoreSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleComputeAndSave(parsed.data.groupId);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[POST /api/health-score/compute]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
