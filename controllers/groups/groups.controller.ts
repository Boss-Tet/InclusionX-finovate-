import { createGroup, CreateGroupArgs } from '@/services/groups/createGroup';
import { joinGroup } from '@/services/groups/joinGroup';
import { getGroupById } from '@/services/groups/getGroupById';
import { updateMemberRole } from '@/services/groups/updateMemberRole';
import { updateMemberStatus } from '@/services/groups/updateMemberStatus';
import { leaveGroup } from '@/services/groups/leaveGroup';
import { transferOwnership } from '@/services/groups/transferOwnership';
import { GroupRole, MembershipStatus } from '@prisma/client';

export class GroupsController {
  static async create(args: CreateGroupArgs) {
    return await createGroup(args);
  }

  static async join(userId: string, inviteCode: string) {
    return await joinGroup(userId, inviteCode);
  }

  static async getById(groupId: string) {
    return await getGroupById(groupId);
  }

  static async updateRole(memberId: string, groupId: string, newRole: GroupRole) {
    return await updateMemberRole(memberId, groupId, newRole);
  }

  static async updateStatus(memberId: string, groupId: string, newStatus: MembershipStatus) {
    return await updateMemberStatus(memberId, groupId, newStatus);
  }

  static async leave(userId: string, groupId: string) {
    return await leaveGroup(userId, groupId);
  }

  static async transferOwnership(groupId: string, currentChairpersonId: string, newChairpersonUserId: string) {
    return await transferOwnership(groupId, currentChairpersonId, newChairpersonUserId);
  }
}
