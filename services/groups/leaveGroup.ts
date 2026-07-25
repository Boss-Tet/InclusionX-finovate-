import db from '@/lib/db';
import { GroupMember } from '@prisma/client';
import { updateMemberStatus } from './updateMemberStatus';

export async function leaveGroup(
  userId: string,
  groupId: string
): Promise<GroupMember | null> {
  const member = await db.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId,
        userId,
      },
    },
  });

  if (!member) return null;

  if (member.roleInGroup === 'CHAIRPERSON') {
    throw new Error('Chairperson cannot leave the group. Transfer ownership first.');
  }

  // updateMemberStatus already checks for outstanding loans and writes to the ledger
  return await updateMemberStatus(member.id, groupId, 'REMOVED');
}
