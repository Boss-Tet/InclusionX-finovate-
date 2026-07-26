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
    // x-caller-platform-role → User.platformRole (BANK_OFFICER / ADMIN)
    // This is a system-wide endpoint — group role is irrelevant here.
    const callerPlatformRole = req.headers.get('x-caller-platform-role') ?? '';
    const result = await handleGetAllScores(callerPlatformRole);
    const status = result.success ? 200 : result.code === 'FORBIDDEN' ? 403 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[GET /api/health-score/all]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
