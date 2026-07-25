'use client';

import { useState } from 'react';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';
import { MOCK_HEALTH_SUMMARIES } from '@/lib/mock/healthScoreMock';

export function useGroup(groupId: string = 'grp-001') {
  const [members, setMembers] = useState<UserProfile[]>([
    MOCK_USERS.member,
    MOCK_USERS.chairperson,
    MOCK_USERS.treasurer,
    MOCK_USERS.secretary,
  ]);

  const groupHealth = MOCK_HEALTH_SUMMARIES.find((g) => g.groupId === groupId) || MOCK_HEALTH_SUMMARIES[0];

  return {
    groupId,
    groupName: 'Tiyanjane Women VSLA',
    members,
    groupHealth,
  };
}
