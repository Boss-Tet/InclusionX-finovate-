// =============================================================================
// app/api/loans/[id]/repayments/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/loans/:id/repayments — fetch all repayment instalments for a loan
// Allows a member to see their own repayment history.
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getRepaymentsByLoan } from '@/services/loans/getRepaymentsByLoan';
import { getLoanById } from '@/services/loans/getLoanById';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: loanId } = await params;

    // Verify loan exists before fetching repayments
    const loan = await getLoanById(loanId);
    if (!loan) {
      return NextResponse.json({ success: false, error: 'Loan not found.' }, { status: 404 });
    }

    const repayments = await getRepaymentsByLoan(loanId);
    return NextResponse.json({ success: true, data: repayments }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/loans/:id/repayments]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
