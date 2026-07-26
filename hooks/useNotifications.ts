'use client';

/**
 * hooks/useNotifications.ts — real API integration
 *
 * GET  /api/notifications              → list notifications for logged-in user
 * POST /api/notifications/[id]/read   → mark one notification as read
 */

import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from '@/lib/api/client';

export interface NotificationRecord {
  id: string;
  userId: string;
  title: string;
  body: string;
  channel: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsState {
  notifications: NotificationRecord[];
  isLoading: boolean;
  error: string | null;
}

export function useNotifications(limit = 50) {
  const [state, setState] = useState<NotificationsState>({
    notifications: [],
    isLoading: true,
    error: null,
  });

  const fetchNotifications = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const data = await api.get<NotificationRecord[]>(
        `/api/notifications?limit=${limit}`
      );
      setState({ notifications: Array.isArray(data) ? data : [], isLoading: false, error: null });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to load notifications.';
      setState((s) => ({ ...s, isLoading: false, error: msg }));
    }
  }, [limit]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    // Optimistic update
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
    try {
      await api.post(`/api/notifications/${id}/read`, {});
    } catch {
      // Roll back on failure
      setState((s) => ({
        ...s,
        notifications: s.notifications.map((n) =>
          n.id === id ? { ...n, read: false } : n
        ),
      }));
    }
  }, []);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return {
    notifications: state.notifications,
    unreadCount,
    isLoading: state.isLoading,
    error: state.error,
    markAsRead,
    refresh: fetchNotifications,
  };
}
