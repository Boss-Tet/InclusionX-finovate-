// =============================================================================
// app/api/loans/[id]/disburse/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/loans/:id/disburse — Treasurer marks an APPROVED loan as DISBURSED
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleDisburseLoan } from '@/controllers/loans/handleDisburseLoan';
import { DisburseLoanSchema } from '@/lib/validations/loans';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: loanId } = await params;
    const body = await req.json();
    const parsed = DisburseLoanSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    // x-caller-group-role → GroupMember.roleInGroup (must be TREASURER)
    const callerGroupRole = req.headers.get('x-caller-group-role') ?? '';

    const result = await handleDisburseLoan({ loanId, ...parsed.data, callerGroupRole });
    const status = result.success ? 200 : result.code === 'FORBIDDEN' ? 403 : result.code === 'NOT_FOUND' ? 404 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error('[POST /api/loans/:id/disburse]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
