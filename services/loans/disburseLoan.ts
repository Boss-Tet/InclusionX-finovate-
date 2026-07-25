// =============================================================================
// services/loans/disburseLoan.ts
// Owned by: Jabari (Financial Logic)
// Marks the loan as DISBURSED. The controller writes the ledger entry first.
// =============================================================================

import db from '@/lib/db';
import { LoanRecord } from '@/types/financial';

interface DisburseLoanArgs {
  loanId: string;
  paychanguRef?: string;
}

export async function disburseLoan(args: DisburseLoanArgs): Promise<LoanRecord> {
  const { loanId, paychanguRef } = args;

  const updated = await db.loan.update({
    where: { id: loanId },
    data: {
      status: 'DISBURSED',
      disbursedAt: new Date(),
      ...(paychanguRef ? { paychanguRef } : {}),
    },
  });

  return updated as unknown as LoanRecord;
}
