// =============================================================================
// services/notifications/markNotificationRead.ts
// Owned by: Orama (Auth & Governance)
//
// Marks an in-app notification as read.
// =============================================================================

import db from '@/lib/db';
import { Notification } from '@prisma/client';

export async function markNotificationRead(
  notificationId: string,
  userId: string
): Promise<Notification | null> {
  const notification = await db.notification.findUnique({
    where: { id: notificationId },
  });

  // Ensure it exists and belongs to the caller
  if (!notification || notification.userId !== userId) {
    return null;
  }

  return await db.notification.update({
    where: { id: notificationId },
    data: {
      status: 'READ',
      readAt: new Date(),
    },
  });
}
