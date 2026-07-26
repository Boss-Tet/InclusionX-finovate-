import db from '@/lib/db';
import { GroupMember, GroupRole, PlatformRole } from '@prisma/client';

/** Map GroupRole → the matching PlatformRole (BANK_OFFICER/ADMIN are platform-only, not group roles). */
const GROUP_ROLE_TO_PLATFORM: Record<GroupRole, PlatformRole> = {
  MEMBER: PlatformRole.MEMBER,
  CHAIRPERSON: PlatformRole.CHAIRPERSON,
  TREASURER: PlatformRole.TREASURER,
  SECRETARY: PlatformRole.SECRETARY,
};

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

  return await db.$transaction(async (tx) => {
    // Update the in-group role
    const updated = await tx.groupMember.update({
      where: { id: memberId },
      data: { roleInGroup: newRole },
    });

    // Sync User.platformRole so the correct dashboard is shown after their next login
    await tx.user.update({
      where: { id: member.userId },
      data: { platformRole: GROUP_ROLE_TO_PLATFORM[newRole] },
    });

    return updated;
  });
}
