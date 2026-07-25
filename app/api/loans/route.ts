// =============================================================================
// app/api/loans/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/loans — Member requests a loan
// GET  /api/loans — List loans for a group (+ optional member filter)
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleRequestLoan } from '@/controllers/loans/handleRequestLoan';
import { handleGetLoans } from '@/controllers/loans/handleGetLoans';
import { RequestLoanSchema, GetLoansQuerySchema } from '@/lib/validations/loans';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestLoanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const callerMemberId = req.headers.get('x-caller-member-id') ?? '';

    const result = await handleRequestLoan({ ...parsed.data, callerMemberId });
    const status = result.success ? 201 : result.code === 'FORBIDDEN' ? 403 : result.code === 'CONFLICT' ? 409 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[POST /api/loans]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = GetLoansQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }
    const result = await handleGetLoans(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error('[GET /api/loans]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
