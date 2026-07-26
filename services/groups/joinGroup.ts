import db from '@/lib/db';
import { GroupMember, PlatformRole } from '@prisma/client';

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

  // Create membership and sync platformRole in one transaction
  return await db.$transaction(async (tx) => {
    const member = await tx.groupMember.create({
      data: {
        groupId: group.id,
        userId,
        roleInGroup: 'MEMBER',
        status: 'ACTIVE',
      },
    });

    // Sync platformRole — joining as a regular member means MEMBER platform role.
    // Only update if the user's current role doesn't already reflect a higher office
    // (e.g. don't demote a CHAIRPERSON of another group just because they joined this one as MEMBER).
    const user = await tx.user.findUnique({ where: { id: userId } });
    const officeRoles: PlatformRole[] = [
      PlatformRole.CHAIRPERSON,
      PlatformRole.TREASURER,
      PlatformRole.SECRETARY,
      PlatformRole.BANK_OFFICER,
      PlatformRole.ADMIN,
    ];
    if (!officeRoles.includes(user?.platformRole as PlatformRole)) {
      await tx.user.update({
        where: { id: userId },
        data: { platformRole: PlatformRole.MEMBER },
      });
    }

    return member;
  });
}
