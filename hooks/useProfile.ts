'use client';

import { useState } from 'react';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';

export function useProfile(role: keyof typeof MOCK_USERS = 'member') {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USERS[role]);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  return {
    profile,
    updateProfile,
  };
}
