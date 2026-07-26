'use client';

import { useState } from 'react';
import { MOCK_WITHDRAWALS } from '@/lib/mock/withdrawalsMock';
import { WithdrawalWithVotes } from '@/types/financial';

export function useWithdrawals(memberId: string = 'usr-mem-01') {
  const [withdrawals, setWithdrawals] = useState<WithdrawalWithVotes[]>(MOCK_WITHDRAWALS);

  const requestWithdrawal = (amountTambala: number, reason: string) => {
    const newWth: WithdrawalWithVotes = {
      id: `wth-${Date.now()}`,
      groupId: 'grp-001',
      memberId,
      amountTambala,
      reason,
      status: 'PENDING',
      createdAt: new Date(),
      approveCount: 0,
      rejectCount: 0,
      quorumNeeded: 3,
      votes: [],
    };
    setWithdrawals((prev) => [newWth, ...prev]);
  };

  return {
    withdrawals,
    requestWithdrawal,
  };
}
