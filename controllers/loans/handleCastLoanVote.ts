// =============================================================================
// controllers/loans/handleCastLoanVote.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Voter's in-group role must be CHAIRPERSON, TREASURER, or SECRETARY
//   2. Loan must be in PENDING status (not yet resolved)
//   3. No double-vote — DB unique constraint enforces; catch P2002
//   4. After inserting the vote, delegate to handleCheckLoanResult
// =============================================================================

import db from '@/lib/db';
import { castLoanVote } from '@/services/loans/castLoanVote';
import { CastLoanVoteInput } from '@/lib/validations/loans';
import { ApiResponse, LoanVoteRecord } from '@/types/financial';
import { LOAN_RULES } from '@/config/loanRules';

type HandleCastLoanVoteArgs = CastLoanVoteInput & {
  loanId: string;
  /** GroupMember.roleInGroup — must be one of GroupRole CHAIRPERSON/TREASURER/SECRETARY */
  callerGroupRole: string;
};

export async function handleCastLoanVote(
  args: HandleCastLoanVoteArgs
): Promise<ApiResponse<LoanVoteRecord>> {
  const { loanId, voterId, decision, note, callerGroupRole } = args;

  // Group-role guard — reads GroupMember.roleInGroup, NOT User.platformRole.
  if (!(LOAN_RULES.requiredVoterRoles as readonly string[]).includes(callerGroupRole)) {
    return {
      success: false,
      error: 'Only a group Chairperson, Treasurer, or Secretary can vote on loan requests.',
      code: 'FORBIDDEN',
    };
  }

  // 2. Loan must be PENDING.
  const loan = await db.loan.findUnique({
    where: { id: loanId },
    select: { status: true },
  });
  if (!loan) return { success: false, error: 'Loan not found.', code: 'NOT_FOUND' };
  if (loan.status !== 'PENDING') {
    return {
      success: false,
      error: `Cannot vote on a loan with status ${loan.status}.`,
      code: 'INVALID_STATE',
    };
  }

  // 3. Insert vote — catch duplicate.
  try {
    const vote = await castLoanVote({ loanId, voterId, decision, note });
    return { success: true, data: vote };
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return { success: false, error: 'You have already voted on this loan.', code: 'DUPLICATE_VOTE' };
    }
    throw err;
  }
}
