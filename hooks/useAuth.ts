'use client';

import { useState } from 'react';
import { MOCK_USERS, UserProfile } from '@/lib/mock/authMock';

export function useAuth(role: keyof typeof MOCK_USERS = 'member') {
  const [currentUser, setCurrentUser] = useState<UserProfile>(
    MOCK_USERS[role] || MOCK_USERS.member
  );
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const switchRole = (newRole: keyof typeof MOCK_USERS) => {
    if (MOCK_USERS[newRole]) {
      setCurrentUser(MOCK_USERS[newRole]);
    }
  };

  const login = (email: string) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return {
    currentUser,
    isAuthenticated,
    switchRole,
    login,
    logout,
  };
}
