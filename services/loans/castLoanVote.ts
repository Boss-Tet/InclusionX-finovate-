// =============================================================================
// services/loans/castLoanVote.ts
// Owned by: Jabari (Financial Logic)
//
// Inserts a single vote row. The @@unique([loanId, voterId]) constraint on
// loan_votes guarantees no duplicate votes at the DB level.
// Catch Prisma P2002 error in the controller and return 409 Conflict.
// =============================================================================

import db from '@/lib/db';
import { LoanVoteRecord } from '@/types/financial';

interface CastLoanVoteArgs {
  loanId: string;
  voterId: string; // GroupMember.id
  decision: 'APPROVE' | 'REJECT';
  note?: string;
}

/**
 * Inserts a loan vote. Throws a Prisma unique constraint error (P2002)
 * if the voter has already voted — the controller must catch this.
 */
export async function castLoanVote(args: CastLoanVoteArgs): Promise<LoanVoteRecord> {
  const { loanId, voterId, decision, note } = args;

  const vote = await db.loanVote.create({
    data: {
      loanId,
      voterId,
      decision,
      note: note ?? null,
    },
  });

  return vote as LoanVoteRecord;
}
