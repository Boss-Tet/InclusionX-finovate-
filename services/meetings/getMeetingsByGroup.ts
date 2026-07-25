import db from '@/lib/db';
import { Meeting } from '@prisma/client';

export async function getMeetingsByGroup(groupId: string): Promise<Meeting[]> {
  return await db.meeting.findMany({
    where: { groupId },
    orderBy: { scheduledAt: 'desc' },
    include: {
      attendance: true,
    },
  });
}
