import { z } from 'zod';
import { AttendanceStatus } from '@prisma/client';

export const ScheduleMeetingSchema = z.object({
  groupId: z.string().uuid(),
  scheduledAt: z.string().datetime(), // ISO string
  agenda: z.string().optional(),
  location: z.string().max(500).optional(),
});

export const RecordAttendanceSchema = z.object({
  records: z.array(z.object({
    memberId: z.string().uuid(),
    status: z.nativeEnum(AttendanceStatus),
    note: z.string().max(500).optional(),
  })),
});

export const UpdateMinutesSchema = z.object({
  minutes: z.string().min(1),
});
