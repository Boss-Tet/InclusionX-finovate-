import db from '@/lib/db';
import { GroupMember } from '@prisma/client';

export async function joinGroup(userId: string, inviteCode: string): Promise<GroupMember | null> {
  const group = await db.vslaGroup.findUnique({
    where: { inviteCode },
  });

  if (!group || group.status !== 'ACTIVE') {
    return null; // Group not found or closed
  }

  // Check if user is already in the group
  const existingMember = await db.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId: group.id,
        userId,
      },
    },
  });

  if (existingMember) {
    // If they were removed or suspended, joining via invite code doesn't bypass that.
    // They would need the chairperson to re-activate them.
    throw new Error('User is already a member of this group, or has been removed/suspended.');
  }

  return await db.groupMember.create({
    data: {
      groupId: group.id,
      userId,
      roleInGroup: 'MEMBER',
      status: 'ACTIVE',
    },
  });
}
