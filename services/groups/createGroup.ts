import db from '@/lib/db';
import { VslaGroup, GroupRole, CycleFrequency, PlatformRole } from '@prisma/client';
import crypto from 'crypto';

export interface CreateGroupArgs {
  name: string;
  description?: string;
  contributionAmountTambala: number;
  interestRate: number;
  loanMultipleCap?: number;
  withdrawalQuorumPct?: number;
  cycleFrequency?: CycleFrequency;
  meetingLocation?: string;
  chairpersonId: string;
}

export async function createGroup(args: CreateGroupArgs): Promise<VslaGroup> {
  const { chairpersonId, ...groupData } = args;

  // Generate a random 6-character uppercase alphanumeric invite code
  const inviteCode = crypto.randomBytes(3).toString('hex').toUpperCase();

  // Create the group, the chairperson's membership, AND sync platformRole — all in one transaction
  return await db.$transaction(async (tx) => {
    const group = await tx.vslaGroup.create({
      data: {
        ...groupData,
        inviteCode,
        chairpersonId,
        members: {
          create: {
            userId: chairpersonId,
            roleInGroup: GroupRole.CHAIRPERSON,
            status: 'ACTIVE',
          },
        },
      },
    });

    // Sync User.platformRole so the dashboard redirect works correctly
    await tx.user.update({
      where: { id: chairpersonId },
      data: { platformRole: PlatformRole.CHAIRPERSON },
    });

    return group;
  });
}
