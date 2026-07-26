import db from '@/lib/db';

export async function getMembersByGroup(groupId: string) {
  return db.groupMember.findMany({
    where: { groupId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          avatarUrl: true,
          platformRole: true,
        },
      },
    },
    orderBy: { joinDate: 'asc' },
  });
}
