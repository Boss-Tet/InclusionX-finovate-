import db from '@/lib/db';
import { Meeting } from '@prisma/client';

export async function updateMeetingMinutes(
  meetingId: string,
  minutes: string
): Promise<Meeting> {
  return await db.meeting.update({
    where: { id: meetingId },
    data: { minutes },
  });
}
