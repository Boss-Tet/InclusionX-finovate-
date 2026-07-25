// =============================================================================
// services/notifications/updateNotificationPreferences.ts
// Owned by: Orama (Auth & Governance)
//
// Updates a user's notification preferences.
// =============================================================================

import db from '@/lib/db';
import { User } from '@prisma/client';

export interface UpdateNotificationPreferencesArgs {
  userId: string;
  notifyInApp?: boolean;
  notifySms?: boolean;
  notifyEmail?: boolean;
}

export async function updateNotificationPreferences(
  args: UpdateNotificationPreferencesArgs
): Promise<User> {
  const { userId, ...preferences } = args;
  
  return await db.user.update({
    where: { id: userId },
    data: preferences,
  });
}

export async function getNotificationPreferences(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      notifyInApp: true,
      notifySms: true,
      notifyEmail: true,
    }
  });
  return user;
}
