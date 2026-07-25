import db from '@/lib/db';
import { GroupMember, GroupRole } from '@prisma/client';

export async function updateMemberRole(
  memberId: string,
  groupId: string,
  newRole: GroupRole
): Promise<GroupMember | null> {
  // Ensure the member belongs to the given group
  const member = await db.groupMember.findUnique({
    where: { id: memberId },
  });

  if (!member || member.groupId !== groupId) return null;

  return await db.groupMember.update({
    where: { id: memberId },
    data: { roleInGroup: newRole },
  });
}
