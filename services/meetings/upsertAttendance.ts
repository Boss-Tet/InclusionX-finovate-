import db from '@/lib/db';
import { AttendanceStatus } from '@prisma/client';

export interface AttendanceRecord {
  memberId: string;
  status: AttendanceStatus;
  note?: string;
}

export async function upsertAttendance(
  meetingId: string,
  records: AttendanceRecord[]
) {
  // Use a transaction to process all records safely
  return await db.$transaction(
    records.map((record) =>
      db.attendance.upsert({
        where: {
          meetingId_memberId: {
            meetingId,
            memberId: record.memberId,
          },
        },
        update: {
          status: record.status,
          note: record.note,
        },
        create: {
          meetingId,
          memberId: record.memberId,
          status: record.status,
          note: record.note,
        },
      })
    )
  );
}
