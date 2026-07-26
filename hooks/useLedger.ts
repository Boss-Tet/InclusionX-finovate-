'use client';

/**
 * hooks/useLedger.ts — real API integration
 *
 * GET /api/ledger?groupId=... → list ledger entries
 */

import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '@/lib/api/client';
import type { LedgerEntryRecord, PaginatedLedger } from '@/types/financial';

interface UseLedgerOptions {
  groupId: string;
}

interface LedgerState {
  entries: LedgerEntryRecord[];
  isLoading: boolean;
  error: string | null;
}

export function useLedger({ groupId }: UseLedgerOptions) {
  const [state, setState] = useState<LedgerState>({
    entries: [],
    isLoading: true,
    error: null,
  });

  const fetchLedger = useCallback(async () => {
    if (!groupId) return;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await api.get<PaginatedLedger>(`/api/ledger?groupId=${groupId}&pageSize=50`);
      // Parse dates since JSON doesn't preserve Date objects
      const parsedEntries = (data.entries ?? []).map(entry => ({
        ...entry,
        createdAt: new Date(entry.createdAt)
      }));
      setState({ entries: parsedEntries, isLoading: false, error: null });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to load ledger.';
      setState((s) => ({ ...s, isLoading: false, error: msg }));
    }
  }, [groupId]);

  useEffect(() => { fetchLedger(); }, [fetchLedger]);

  return {
    entries: state.entries,
    isLoading: state.isLoading,
    error: state.error,
    refresh: fetchLedger,
  };
}
