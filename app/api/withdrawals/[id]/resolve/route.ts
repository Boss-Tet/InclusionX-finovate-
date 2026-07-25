// =============================================================================
// app/api/withdrawals/[id]/resolve/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/withdrawals/:id/resolve — Manually trigger withdrawal resolution
// Used as a fallback if automatic resolution at quorum fails or if the 
// treasurer needs to force a re-evaluation of the withdrawal request.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleResolveWithdrawal } from '@/controllers/withdrawals/handleResolveWithdrawal';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: requestId } = await params;
    
    // x-caller-group-role -> GroupMember.roleInGroup
    // Ensure caller is an officer (TREASURER, CHAIRPERSON, SECRETARY)
    const callerGroupRole = req.headers.get('x-caller-group-role') ?? '';
    if (!['TREASURER', 'CHAIRPERSON', 'SECRETARY'].includes(callerGroupRole)) {
       return NextResponse.json({ success: false, error: 'Only group officers can manually resolve withdrawals.' }, { status: 403 });
    }

    const resolution = await handleResolveWithdrawal(requestId);

    return NextResponse.json(
      { success: true, data: resolution.success ? resolution.data : null },
      { status: 200 }
    );
  } catch (err) {
    console.error('[POST /api/withdrawals/:id/resolve]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
