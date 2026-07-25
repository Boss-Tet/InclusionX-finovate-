// =============================================================================
// controllers/loans/handleRequestLoan.ts
// Owned by: Jabari (Financial Logic)
//
// Business rules:
//   1. Member must be ACTIVE in the group
//   2. principal ≤ savings balance × group.loanMultipleCap
//   3. Member must have no other PENDING or DISBURSED loan in this group
// =============================================================================

import db from '@/lib/db';
import { createLoanRequest } from '@/services/loans/createLoanRequest';
import { getMemberBalance } from '@/services/savings/getMemberBalance';
import { RequestLoanInput } from '@/lib/validations/loans';
import { ApiResponse, LoanRecord } from '@/types/financial';

interface HandleRequestLoanArgs extends RequestLoanInput {
  callerMemberId: string; // GroupMember.id of the requesting member
}

export async function handleRequestLoan(
  args: HandleRequestLoanArgs
): Promise<ApiResponse<LoanRecord>> {
  const { groupId, memberId, principalTambala, dueDate, callerMemberId } = args;

  // Enforce: caller can only request a loan for themselves.
  if (callerMemberId !== memberId) {
    return { success: false, error: 'You can only request a loan for yourself.', code: 'FORBIDDEN' };
  }

  // 1. Load group config for interest rate + loan cap.
  const group = await db.vslaGroup.findUnique({
    where: { id: groupId },
    select: { interestRate: true, loanMultipleCap: true, status: true },
  });
  if (!group || group.status !== 'ACTIVE') {
    return { success: false, error: 'Group not found or inactive.', code: 'NOT_FOUND' };
  }

  // 2. Check member is active.
  const membership = await db.groupMember.findUnique({
    where: { groupId_userId: { groupId, userId: memberId } },
    select: { id: true, status: true },
  });
  if (!membership || membership.status !== 'ACTIVE') {
    return { success: false, error: 'Member is not active in this group.', code: 'FORBIDDEN' };
  }

  // 3. Check for existing active loan (PENDING or DISBURSED).
  const activeLoan = await db.loan.findFirst({
    where: {
      groupId,
      memberId: membership.id,
      status: { in: ['PENDING', 'APPROVED', 'DISBURSED', 'REPAYING'] },
    },
    select: { id: true, status: true },
  });
  if (activeLoan) {
    return {
      success: false,
      error: `You already have an active loan (${activeLoan.status}). Repay it before requesting another.`,
      code: 'CONFLICT',
    };
  }

  // 4. Enforce loan cap: principal ≤ savingsBalance × loanMultipleCap.
  const balance = await getMemberBalance(membership.id, groupId);
  const maxAllowed = Math.floor(
    balance.totalContributedTambala * Number(group.loanMultipleCap)
  );
  if (principalTambala > maxAllowed) {
    return {
      success: false,
      error: `Loan amount exceeds your cap. Maximum allowed: ${maxAllowed} tambala (${Number(group.loanMultipleCap)}× your savings of ${balance.totalContributedTambala} tambala).`,
      code: 'LOAN_CAP_EXCEEDED',
    };
  }

  // 5. Create the loan.
  const loan = await createLoanRequest({
    groupId,
    memberId: membership.id,
    principalTambala,
    interestRate: Number(group.interestRate),
    dueDate: dueDate ? new Date(dueDate) : undefined,
  });

  return { success: true, data: loan };
}
