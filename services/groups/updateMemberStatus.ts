import db from '@/lib/db';
import { GroupMember, MembershipStatus } from '@prisma/client';

export async function updateMemberStatus(
  memberId: string,
  groupId: string,
  newStatus: MembershipStatus
): Promise<GroupMember | null> {
  const member = await db.groupMember.findUnique({
    where: { id: memberId },
  });

  if (!member || member.groupId !== groupId) return null;

  // Cannot remove a member if they have outstanding loans
  if (newStatus === 'REMOVED') {
    const outstandingLoans = await db.loan.findMany({
      where: {
        memberId,
        status: {
          in: ['APPROVED', 'DISBURSED', 'REPAYING', 'OVERDUE'],
        },
      },
    });

    if (outstandingLoans.length > 0) {
      throw new Error('Cannot remove member with outstanding loans.');
    }
  }

  // Record governance action in the ledger if they are suspended/removed
  if (newStatus === 'SUSPENDED' || newStatus === 'REMOVED') {
    await db.ledgerEntry.create({
      data: {
        groupId,
        entryType: newStatus === 'SUSPENDED' ? 'MEMBER_SUSPENDED' : 'MEMBER_REMOVED',
        referenceId: memberId, // Using memberId as the reference
        amountTambala: 0, // No direct financial movement, just logging the event
        direction: 'DEBIT', // Doesn't strictly matter for amount=0
        reason: `Member ${newStatus.toLowerCase()} by governance action`,
      },
    });
  }

  return await db.groupMember.update({
    where: { id: memberId },
    data: { status: newStatus },
  });
}
