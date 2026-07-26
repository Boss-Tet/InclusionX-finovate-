// =============================================================================
// services/loans/getLoansByMember.ts
// Owned by: Jabari (Financial Logic)
// =============================================================================

import db from '@/lib/db';
import { LoanRecord } from '@/types/financial';

/**
 * Returns all loans for a specific group member, newest first.
 */
export async function getLoansByMember(
  memberId: string,
  groupId: string
): Promise<LoanRecord[]> {
  const loans = await db.loan.findMany({
    where: { memberId, groupId },
    include: { votes: true },
    orderBy: { requestedAt: 'desc' },
  });

  return loans as unknown as LoanRecord[];
}
