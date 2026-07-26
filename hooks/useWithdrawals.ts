'use client';

/**
 * hooks/useWithdrawals.ts — real API integration
 *
 * GET  /api/withdrawals?groupId=&memberId= → list withdrawal requests
 * POST /api/withdrawals                    → submit a withdrawal request
 * POST /api/withdrawals/[id]/vote          → cast vote
 */

import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '@/lib/api/client';
import type { WithdrawalWithVotes } from '@/types/financial';

interface UseWithdrawalsOptions {
  groupId: string;
  memberId?: string;
  callerMemberId?: string;
}

interface WithdrawalsState {
  withdrawals: WithdrawalWithVotes[];
  isLoading: boolean;
  error: string | null;
}

export function useWithdrawals({ groupId, memberId, callerMemberId }: UseWithdrawalsOptions) {
  const [state, setState] = useState<WithdrawalsState>({
    withdrawals: [],
    isLoading: true,
    error: null,
  });

  const fetchWithdrawals = useCallback(async () => {
    if (!groupId) return;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const params = new URLSearchParams({ groupId });
      if (memberId) params.set('memberId', memberId);
      const data = await api.get<{ items: WithdrawalWithVotes[]; total: number }>(
        `/api/withdrawals?${params}`
      );
      setState({ withdrawals: data.items ?? [], isLoading: false, error: null });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to load withdrawals.';
      setState((s) => ({ ...s, isLoading: false, error: msg }));
    }
  }, [groupId, memberId]);

  useEffect(() => { fetchWithdrawals(); }, [fetchWithdrawals]);

  const requestWithdrawal = useCallback(
    async (amountTambala: number, reason: string) => {
      if (!callerMemberId) throw new Error('callerMemberId required to request withdrawal.');
      await api.post('/api/withdrawals', {
        groupId,
        memberId: callerMemberId,
        amountTambala,
        reason,
      });
      await fetchWithdrawals();
    },
    [groupId, callerMemberId, fetchWithdrawals]
  );

  const voteWithdrawal = useCallback(
    async (requestId: string, decision: 'APPROVE' | 'REJECT', note?: string) => {
      if (!callerMemberId) throw new Error('callerMemberId required to vote.');
      await api.post(`/api/withdrawals/${requestId}/vote`, {
        voterId: callerMemberId,
        decision,
        ...(note ? { note } : {}),
      });
      await fetchWithdrawals();
    },
    [callerMemberId, fetchWithdrawals]
  );

  return {
    withdrawals: state.withdrawals,
    isLoading: state.isLoading,
    error: state.error,
    requestWithdrawal,
    voteWithdrawal,
    refresh: fetchWithdrawals,
  };
}
