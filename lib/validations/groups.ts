import { z } from 'zod';
import { CycleFrequency, GroupRole, MembershipStatus } from '@prisma/client';

export const CreateGroupSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  contributionAmountTambala: z.number().int().positive(),
  interestRate: z.number().min(0).max(100),
  loanMultipleCap: z.number().min(1).max(10).optional().default(3.0),
  withdrawalQuorumPct: z.number().min(1).max(100).optional().default(50.0),
  cycleFrequency: z.nativeEnum(CycleFrequency).optional().default(CycleFrequency.MONTHLY),
  meetingLocation: z.string().max(500).optional(),
});

export const JoinGroupSchema = z.object({
  inviteCode: z.string().length(6), // We'll generate 6-char codes
});

export const UpdateRoleSchema = z.object({
  role: z.nativeEnum(GroupRole),
});

export const UpdateStatusSchema = z.object({
  status: z.enum([MembershipStatus.SUSPENDED, MembershipStatus.REMOVED]),
});

export const TransferOwnershipSchema = z.object({
  newChairpersonId: z.string().uuid(),
});
