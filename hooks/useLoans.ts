'use client';

import { useState } from 'react';
import { MOCK_LOANS, MOCK_REPAYMENTS } from '@/lib/mock/loansMock';
import { LoanWithVotes } from '@/types/financial';

export function useLoans(memberId: string = 'usr-mem-01') {
  const [loans, setLoans] = useState<LoanWithVotes[]>(MOCK_LOANS);

  const applyLoan = (principalTambala: number, reason?: string) => {
    const newLoan: LoanWithVotes = {
      id: `loan-${Date.now()}`,
      groupId: 'grp-001',
      memberId,
      principalTambala,
      interestRate: 10,
      totalDueTambala: Math.round(principalTambala * 1.1),
      amountRepaidTambala: 0,
      status: 'PENDING',
      rejectionReason: null,
      requestedAt: new Date(),
      approvedAt: null,
      disbursedAt: null,
      dueDate: null,
      repaidAt: null,
      remainingDueTambala: Math.round(principalTambala * 1.1),
      votes: [],
    };
    setLoans((prev) => [newLoan, ...prev]);
  };

  const voteLoan = (loanId: string, decision: 'APPROVE' | 'REJECT', note?: string) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id === loanId) {
          const newVote = {
            id: `vote-${Date.now()}`,
            loanId,
            voterId: 'usr-chair-01',
            decision,
            note: note || null,
            votedAt: new Date(),
          };
          return {
            ...l,
            votes: [...l.votes, newVote],
            status: decision === 'APPROVE' ? ('APPROVED' as const) : ('REJECTED' as const),
          };
        }
        return l;
      })
    );
  };

  return {
    loans,
    repayments: MOCK_REPAYMENTS,
    applyLoan,
    voteLoan,
  };
}
