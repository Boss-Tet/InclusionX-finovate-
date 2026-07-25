// =============================================================================
// app/api/withdrawals/[id]/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/withdrawals/:id — fetch a single withdrawal request with votes
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getWithdrawalById } from '@/services/withdrawals/getWithdrawalById';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const request = await getWithdrawalById(id);
    if (!request) return NextResponse.json({ success: false, error: 'Withdrawal request not found.' }, { status: 404 });
    return NextResponse.json({ success: true, data: request }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/withdrawals/:id]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
