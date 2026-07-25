// =============================================================================
// services/loans/updateLoanStatus.ts
// Owned by: Jabari (Financial Logic)
// Generic loan status updater — called by the controller after vote resolution.
// =============================================================================

import db from '@/lib/db';
import { LoanRecord, LoanStatus } from '@/types/financial';

interface UpdateLoanStatusArgs {
  loanId: string;
  status: LoanStatus;
  /** Set when status → APPROVED */
  totalDueTambala?: number;
  approvedAt?: Date;
  /** Set when status → DISBURSED */
  disbursedAt?: Date;
  paychanguRef?: string;
  /** Set when status → REPAID */
  repaidAt?: Date;
  rejectionReason?: string;
}

export async function updateLoanStatus(
  args: UpdateLoanStatusArgs
): Promise<LoanRecord> {
  const {
    loanId,
    status,
    totalDueTambala,
    approvedAt,
    disbursedAt,
    paychanguRef,
    repaidAt,
    rejectionReason,
  } = args;

  const updated = await db.loan.update({
    where: { id: loanId },
    data: {
      status,
      ...(totalDueTambala != null ? { totalDueTambala } : {}),
      ...(approvedAt ? { approvedAt } : {}),
      ...(disbursedAt ? { disbursedAt } : {}),
      ...(paychanguRef ? { paychanguRef } : {}),
      ...(repaidAt ? { repaidAt } : {}),
      ...(rejectionReason ? { rejectionReason } : {}),
    },
  });

  return updated as unknown as LoanRecord;
}
