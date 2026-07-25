import db from '@/lib/db';
import { VslaGroup, GroupRole, CycleFrequency } from '@prisma/client';
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

  // Create the group and the chairperson's membership in one transaction
  return await db.vslaGroup.create({
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
}
