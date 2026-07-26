// =============================================================================
// services/notifications/getNotifications.ts
// Owned by: Orama (Auth & Governance)
//
// Fetches the in-app notification history for a user.
// =============================================================================

import db from '@/lib/db';
import { Notification } from '@prisma/client';

export async function getNotifications(
  userId: string,
  limit: number = 50
): Promise<Notification[]> {
  return await db.notification.findMany({
    where: {
      userId,
      channel: 'IN_APP',
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
