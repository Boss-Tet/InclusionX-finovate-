// =============================================================================
// app/api/health-score/all/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/health-score/all — all groups with latest score (FR-BANK.1)
// Role guard: BANK_OFFICER or ADMIN only
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleGetAllScores } from '@/controllers/healthScore/handleGetAllScores';

export async function GET(req: NextRequest) {
  try {
    const callerRole = req.headers.get('x-caller-role') ?? '';
    const result = await handleGetAllScores(callerRole);
    const status = result.success ? 200 : result.code === 'FORBIDDEN' ? 403 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[GET /api/health-score/all]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
