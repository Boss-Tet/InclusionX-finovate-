'use client';

import { useState } from 'react';
import { MOCK_NOTIFICATIONS, NotificationRecord } from '@/lib/mock/notificationsMock';

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(MOCK_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}
