// =============================================================================
// app/api/loans/[id]/vote/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/loans/:id/vote — Officer casts a vote; auto-resolves on completion
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleCastLoanVote } from '@/controllers/loans/handleCastLoanVote';
import { handleCheckLoanResult } from '@/controllers/loans/handleCheckLoanResult';
import { CastLoanVoteSchema } from '@/lib/validations/loans';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: loanId } = await params;
    const body = await req.json();
    const parsed = CastLoanVoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const callerGroupRole = req.headers.get('x-caller-group-role') ?? '';

    // 1. Record the vote.
    const voteResult = await handleCastLoanVote({ loanId, ...parsed.data, callerGroupRole });
    if (!voteResult.success) {
      const status = voteResult.code === 'FORBIDDEN' ? 403 : voteResult.code === 'DUPLICATE_VOTE' ? 409 : 400;
      return NextResponse.json(voteResult, { status });
    }

    // 2. Check if loan is now resolved (fire immediately, not fire-and-forget).
    const resolution = await handleCheckLoanResult(loanId);

    return NextResponse.json(
      { success: true, data: { vote: voteResult.data, resolution: resolution.success ? resolution.data : null } },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/loans/:id/vote]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
