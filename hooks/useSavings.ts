'use client';

import { useState } from 'react';
import {
  MOCK_CONTRIBUTIONS,
  MOCK_MEMBER_BALANCES,
  MOCK_SAVINGS_HISTORY,
} from '@/lib/mock/savingsMock';
import { ContributionRecord } from '@/types/financial';

export function useSavings(memberId: string = 'usr-mem-01') {
  const [contributions, setContributions] = useState<ContributionRecord[]>(MOCK_CONTRIBUTIONS);
  const [balance, setBalance] = useState(MOCK_MEMBER_BALANCES);

  const addContribution = (amountTambala: number, method: 'CASH' | 'MOBILE_MONEY' | 'CARD') => {
    const newContrib: ContributionRecord = {
      id: `contrib-${Date.now()}`,
      groupId: 'grp-001',
      memberId,
      amountTambala,
      method,
      status: 'PENDING',
      cyclePeriod: '2026-07',
      recordedById: memberId,
      approvedById: null,
      createdAt: new Date(),
    };
    setContributions((prev) => [newContrib, ...prev]);
  };

  const verifyContribution = (id: string) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'APPROVED' as const } : c))
    );
  };

  return {
    contributions,
    balance,
    savingsHistory: MOCK_SAVINGS_HISTORY,
    addContribution,
    verifyContribution,
  };
}
