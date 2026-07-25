// =============================================================================
// services/loans/createLoanRequest.ts
// Owned by: Jabari (Financial Logic)
// Inserts a PENDING loan record. Eligibility cap check is in the controller.
// =============================================================================

import db from '@/lib/db';
import { LoanRecord } from '@/types/financial';

interface CreateLoanRequestArgs {
  groupId: string;
  memberId: string;
  principalTambala: number;
  /** Comes from vsla_groups.interest_rate */
  interestRate: number;
  dueDate?: Date;
}

/**
 * Creates a loan in PENDING status with no votes yet.
 * The controller must have already validated the loan cap before calling this.
 */
export async function createLoanRequest(
  args: CreateLoanRequestArgs
): Promise<LoanRecord> {
  const { groupId, memberId, principalTambala, interestRate, dueDate } = args;

  const loan = await db.loan.create({
    data: {
      groupId,
      memberId,
      principalTambala,
      interestRate,
      status: 'PENDING',
      dueDate: dueDate ?? null,
    },
  });

  return loan as unknown as LoanRecord;
}
