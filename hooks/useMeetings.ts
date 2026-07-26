'use client';

/**
 * hooks/useMeetings.ts — real API integration
 *
 * GET  /api/meetings?groupId=  → list meetings for a group
 * POST /api/meetings           → schedule a meeting (Chairperson/Secretary only)
 * POST /api/meetings/[id]/attendance → record attendance
 */

import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '@/lib/api/client';

export interface MeetingRecord {
  id: string;
  groupId: string;
  title: string;
  scheduledAt: string;
  location: string | null;
  agendaNotes: string | null;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  recordedById: string;
  createdAt: string;
}

interface MeetingsState {
  meetings: MeetingRecord[];
  isLoading: boolean;
  error: string | null;
}

export function useMeetings(groupId: string) {
  const [state, setState] = useState<MeetingsState>({
    meetings: [],
    isLoading: true,
    error: null,
  });

  const fetchMeetings = useCallback(async () => {
    if (!groupId) return;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await api.get<MeetingRecord[]>(`/api/meetings?groupId=${groupId}`);
      setState({ meetings: Array.isArray(data) ? data : [], isLoading: false, error: null });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to load meetings.';
      setState((s) => ({ ...s, isLoading: false, error: msg }));
    }
  }, [groupId]);

  useEffect(() => { fetchMeetings(); }, [fetchMeetings]);

  const scheduleMeeting = useCallback(
    async (payload: {
      title: string;
      scheduledAt: string;
      location?: string;
      agendaNotes?: string;
    }) => {
      await api.post('/api/meetings', { groupId, ...payload });
      await fetchMeetings();
    },
    [groupId, fetchMeetings]
  );

  const confirmAttendance = useCallback(
    async (meetingId: string, memberId: string) => {
      await api.post(`/api/meetings/${meetingId}/attendance`, { memberId });
      await fetchMeetings();
    },
    [fetchMeetings]
  );

  return {
    meetings: state.meetings,
    isLoading: state.isLoading,
    error: state.error,
    scheduleMeeting,
    confirmAttendance,
    refresh: fetchMeetings,
  };
}
