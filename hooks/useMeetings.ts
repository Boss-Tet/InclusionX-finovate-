'use client';

import { useState } from 'react';
import { MOCK_MEETINGS, MeetingRecord } from '@/lib/mock/meetingsMock';

export function useMeetings() {
  const [meetings, setMeetings] = useState<MeetingRecord[]>(MOCK_MEETINGS);

  const confirmAttendance = (id: string) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, attendeesCount: m.attendeesCount + 1 } : m))
    );
  };

  return {
    meetings,
    confirmAttendance,
  };
}
