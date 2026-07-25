import { createMeeting, CreateMeetingArgs } from '@/services/meetings/createMeeting';
import { getMeetingsByGroup } from '@/services/meetings/getMeetingsByGroup';
import { upsertAttendance, AttendanceRecord } from '@/services/meetings/upsertAttendance';
import { updateMeetingMinutes } from '@/services/meetings/updateMeetingMinutes';

export class MeetingsController {
  static async schedule(args: CreateMeetingArgs) {
    return await createMeeting(args);
  }

  static async getByGroup(groupId: string) {
    return await getMeetingsByGroup(groupId);
  }

  static async recordAttendance(meetingId: string, records: AttendanceRecord[]) {
    return await upsertAttendance(meetingId, records);
  }

  static async updateMinutes(meetingId: string, minutes: string) {
    return await updateMeetingMinutes(meetingId, minutes);
  }
}
