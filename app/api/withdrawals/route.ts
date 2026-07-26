// =============================================================================
// app/api/withdrawals/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/withdrawals — Member submits a withdrawal request
// GET  /api/withdrawals — List withdrawal requests for a group
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleRequestWithdrawal } from '@/controllers/withdrawals/handleRequestWithdrawal';
import { handleGetWithdrawals } from '@/controllers/withdrawals/handleGetWithdrawals';
import { RequestWithdrawalSchema, GetWithdrawalsQuerySchema } from '@/lib/validations/withdrawals';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestWithdrawalSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const callerMemberId = req.headers.get('x-caller-member-id') ?? '';

    const result = await handleRequestWithdrawal({ ...parsed.data, callerMemberId });
    const status = result.success ? 201 : result.code === 'FORBIDDEN' ? 403 : result.code === 'CONFLICT' ? 409 : result.code === 'INSUFFICIENT_FUNDS' ? 422 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[POST /api/withdrawals]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = GetWithdrawalsQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleGetWithdrawals(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[GET /api/withdrawals]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
