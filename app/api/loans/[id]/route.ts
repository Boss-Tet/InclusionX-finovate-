// =============================================================================
// app/api/loans/[id]/route.ts
// Owned by: Jabari (Financial Logic)
//
// GET /api/loans/:id — fetch a single loan with votes
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getLoanById } from '@/services/loans/getLoanById';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const loan = await getLoanById(id);
    if (!loan) return NextResponse.json({ success: false, error: 'Loan not found.' }, { status: 404 });
    return NextResponse.json({ success: true, data: loan }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/loans/:id]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
