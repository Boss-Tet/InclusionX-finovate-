// =============================================================================
// services/notifications/sendFanOutNotification.ts
// Owned by: Orama (Auth & Governance)
//
// Core fan-out service. Takes a single message and delivers it via all
// authorized channels based on the user's preferences.
// =============================================================================

import db from '@/lib/db';
import { NotificationsController } from '@/controllers/notifications/notifications.controller';
import { NotificationChannel } from '@prisma/client';

export interface FanOutNotificationArgs {
  userId: string;
  title: string;
  message: string;
  /** Allow overriding channels for highly specific alerts. Defaults to all available. */
  channels?: NotificationChannel[];
}

export async function sendFanOutNotification({
  userId,
  title,
  message,
  channels = ['IN_APP', 'SMS', 'EMAIL'],
}: FanOutNotificationArgs) {
  // 1. Load user and their preferences
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      phoneNumber: true,
      email: true,
      notifyInApp: true,
      notifySms: true,
      notifyEmail: true,
    },
  });

  if (!user) return; // User not found, abort quietly

  // 2. Dispatch In-App
  if (channels.includes('IN_APP') && user.notifyInApp !== false) {
    await db.notification.create({
      data: {
        userId,
        title,
        message,
        channel: 'IN_APP',
        status: 'SENT',
        sentAt: new Date(),
      },
    });
  }

  // 3. Dispatch SMS
  if (channels.includes('SMS') && user.notifySms !== false) {
    // Log the intent to send
    const smsLog = await db.notification.create({
      data: {
        userId,
        title,
        message,
        channel: 'SMS',
        status: 'PENDING',
      },
    });

    try {
      await NotificationsController.sms({
        to: [user.phoneNumber],
        message: `${title}: ${message}`,
      });
      await db.notification.update({
        where: { id: smsLog.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
    } catch (err) {
      console.error('[sendFanOutNotification] SMS failed:', err);
      await db.notification.update({
        where: { id: smsLog.id },
        data: { status: 'FAILED' },
      });
    }
  }

  // 4. Dispatch Email
  if (channels.includes('EMAIL') && user.notifyEmail !== false && user.email) {
    const emailLog = await db.notification.create({
      data: {
        userId,
        title,
        message,
        channel: 'EMAIL',
        status: 'PENDING',
      },
    });

    try {
      await NotificationsController.email({
        to: user.email,
        subject: title,
        html: `<p>${message}</p>`,
      });
      await db.notification.update({
        where: { id: emailLog.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
    } catch (err) {
      console.error('[sendFanOutNotification] Email failed:', err);
      await db.notification.update({
        where: { id: emailLog.id },
        data: { status: 'FAILED' },
      });
    }
  }
}
