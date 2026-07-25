// =============================================================================
// app/api/withdrawals/[id]/vote/route.ts
// Owned by: Jabari (Financial Logic)
//
// POST /api/withdrawals/:id/vote — Active member casts a vote; auto-resolves at quorum
// =============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { handleCastWithdrawalVote } from '@/controllers/withdrawals/handleCastWithdrawalVote';
import { handleResolveWithdrawal } from '@/controllers/withdrawals/handleResolveWithdrawal';
import { CastWithdrawalVoteSchema } from '@/lib/validations/withdrawals';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: requestId } = await params;
    const body = await req.json();
    const parsed = CastWithdrawalVoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    // 1. Record the vote.
    const voteResult = await handleCastWithdrawalVote({ requestId, ...parsed.data });
    if (!voteResult.success) {
      const status = voteResult.code === 'FORBIDDEN' ? 403 : voteResult.code === 'DUPLICATE_VOTE' ? 409 : 400;
      return NextResponse.json(voteResult, { status });
    }

    // 2. Check quorum and resolve if reached.
    const resolution = await handleResolveWithdrawal(requestId);

    return NextResponse.json(
      { success: true, data: { vote: voteResult.data, resolution: resolution.success ? resolution.data : null } },
      { status: 201 }
    );
  } catch (err) {
    console.error('[POST /api/withdrawals/:id/vote]', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
