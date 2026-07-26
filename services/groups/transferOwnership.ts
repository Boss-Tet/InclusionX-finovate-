import db from '@/lib/db';
import { VslaGroup, PlatformRole } from '@prisma/client';

export async function transferOwnership(
  groupId: string,
  currentChairpersonId: string,
  newChairpersonUserId: string
): Promise<VslaGroup | null> {
  return await db.$transaction(async (tx) => {
    const group = await tx.vslaGroup.findUnique({
      where: { id: groupId },
    });

    if (!group || group.chairpersonId !== currentChairpersonId) {
      throw new Error('Not authorized to transfer ownership of this group.');
    }

    const currentChairpersonMember = await tx.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: currentChairpersonId } },
    });

    const newChairpersonMember = await tx.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: newChairpersonUserId } },
    });

    if (!currentChairpersonMember || !newChairpersonMember) {
      throw new Error('Member not found in group.');
    }

    if (newChairpersonMember.status !== 'ACTIVE') {
      throw new Error('Cannot transfer ownership to an inactive member.');
    }

    // Demote current chairperson's in-group role and platform role
    await tx.groupMember.update({
      where: { id: currentChairpersonMember.id },
      data: { roleInGroup: 'MEMBER' },
    });
    await tx.user.update({
      where: { id: currentChairpersonId },
      data: { platformRole: PlatformRole.MEMBER },
    });

    // Promote new chairperson's in-group role and platform role
    await tx.groupMember.update({
      where: { id: newChairpersonMember.id },
      data: { roleInGroup: 'CHAIRPERSON' },
    });
    await tx.user.update({
      where: { id: newChairpersonUserId },
      data: { platformRole: PlatformRole.CHAIRPERSON },
    });

    // Update group's chairpersonId pointer
    return await tx.vslaGroup.update({
      where: { id: groupId },
      data: { chairpersonId: newChairpersonUserId },
    });
  });
}
