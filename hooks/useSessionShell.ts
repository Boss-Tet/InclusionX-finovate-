'use client';

/**
 * hooks/useSessionShell.ts
 *
 * Provides real user identity to Shell layout components.
 * Fetches GET /api/auth/me and maps to the UserProfile shape
 * that DashboardShell expects, while falling back gracefully
 * so the shell renders immediately even before the fetch completes.
 */

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/lib/mock/authMock';

const FALLBACK: UserProfile = {
  id: '',
  name: 'Loading…',
  email: '',
  phone: '',
  role: 'MEMBER',
  avatarUrl: undefined,
  groupId: '',
  groupName: '',
  joinedDate: '',
  nationalId: '',
};

export function useSessionShell(): { user: UserProfile; isLoading: boolean } {
  const [user, setUser] = useState<UserProfile>(FALLBACK);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          const d = json.data;
          setUser({
            id: d.userId ?? '',
            name: d.fullName ?? d.userId ?? 'User',
            email: d.email ?? '',
            phone: d.phoneNumber ?? '',
            role: (d.platformRole as UserProfile['role']) ?? 'MEMBER',
            avatarUrl: d.avatarUrl ?? undefined,
            // groupId is unknown at session level — set from localStorage if available
            groupId: (typeof window !== 'undefined'
              ? localStorage.getItem('vsla_active_group_id') ?? ''
              : ''),
            groupName: '',
            joinedDate: '',
            nationalId: '',
          });
        }
      })
      .catch(() => { /* keep fallback */ })
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading };
}
