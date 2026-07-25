import db from '@/lib/db';
import { Meeting } from '@prisma/client';

export interface CreateMeetingArgs {
  groupId: string;
  scheduledAt: string;
  agenda?: string;
  location?: string;
  recordedById: string; // The person scheduling it
}

export async function createMeeting(args: CreateMeetingArgs): Promise<Meeting> {
  const { scheduledAt, ...rest } = args;

  return await db.meeting.create({
    data: {
      ...rest,
      scheduledAt: new Date(scheduledAt),
    },
  });
}
