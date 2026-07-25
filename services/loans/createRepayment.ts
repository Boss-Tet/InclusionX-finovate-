// =============================================================================
// services/loans/createRepayment.ts
// Owned by: Jabari (Financial Logic)
//
// Inserts a loan_repayments row and updates the loan's running total.
// The controller writes the ledger entry and checks if loan is fully repaid.
// =============================================================================

import db from '@/lib/db';
import { RepaymentRecord } from '@/types/financial';

interface CreateRepaymentArgs {
  loanId: string;
  amountTambala: number;
  method: 'CASH' | 'MOBILE_MONEY' | 'CARD';
  idempotencyKey?: string;
  paychanguRef?: string;
}

interface CreateRepaymentResult {
  repayment: RepaymentRecord;
  newAmountRepaidTambala: number;
}

/**
 * Inserts a repayment instalment and increments amountRepaidTambala on the loan.
 * Returns both the new repayment and the updated running total.
 */
export async function createRepayment(
  args: CreateRepaymentArgs
): Promise<CreateRepaymentResult> {
  const { loanId, amountTambala, method, idempotencyKey, paychanguRef } = args;

  const [repayment, updatedLoan] = await db.$transaction([
    db.loanRepayment.create({
      data: {
        loanId,
        amountTambala,
        method,
        idempotencyKey: idempotencyKey ?? null,
        paychanguRef: paychanguRef ?? null,
      },
    }),
    db.loan.update({
      where: { id: loanId },
      data: { amountRepaidTambala: { increment: amountTambala } },
      select: { amountRepaidTambala: true },
    }),
  ]);

  return {
    repayment: repayment as RepaymentRecord,
    newAmountRepaidTambala: updatedLoan.amountRepaidTambala,
  };
}
