// =============================================================================
// app/api/loans/[id]/repay/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/loans/:id/repay — Member records a repayment instalment
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleRepayLoan } from '@/controllers/loans/handleRepayLoan';
import { RepayLoanSchema } from '@/lib/validations/loans';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: loanId } = await params;
    const body = await req.json();
    const parsed = RepayLoanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await handleRepayLoan({ loanId, ...parsed.data });
    const status = result.success ? 200 : result.code === 'NOT_FOUND' ? 404 : result.code === 'OVERPAYMENT' ? 422 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[POST /api/loans/:id/repay]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
