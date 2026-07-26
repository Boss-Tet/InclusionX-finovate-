import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { LoanWithVotes } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { PiggyBank, Calendar, ArrowUpRight } from 'lucide-react';

export interface LoanListProps {
  loans: LoanWithVotes[];
  onApplyNew?: () => void;
  onRepay?: (loanId: string) => void;
}

export const LoanList: React.FC<LoanListProps> = ({
  loans,
  onApplyNew,
  onRepay,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'REPAYING':
        return 'warning';
      case 'REPAID':
        return 'success';
      case 'OVERDUE':
        return 'danger';
      case 'PENDING':
        return 'purple';
      default:
        return 'neutral';
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-emerald-600" />
            Member Micro-Loan Applications & Active Loans
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track requested amounts, interest rates, and repayment schedules
          </p>
        </div>
        {onApplyNew && (
          <button
            onClick={onApplyNew}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ArrowUpRight className="w-4 h-4" /> Request New Loan
          </button>
        )}
      </div>

      <div className="space-y-3">
        {loans.map((loan) => {
          const totalDue = loan.totalDueTambala || loan.principalTambala;
          const repaidPct = Math.round(
            (loan.amountRepaidTambala / (totalDue || 1)) * 100
          );

          return (
            <div
              key={loan.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-white dark:bg-slate-900 dark:border-slate-800 space-y-3 shadow-2xs"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Loan Principal: {formatMWK(loan.principalTambala)}
                    </h4>
                    <Badge variant={getStatusVariant(loan.status)}>
                      {loan.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Interest Rate: {loan.interestRate}% • Total Due:{' '}
                    <strong className="text-slate-700 dark:text-slate-300">
                      {formatMWK(totalDue)}
                    </strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Remaining Balance</p>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatMWK(loan.remainingDueTambala)}
                  </p>
                </div>
              </div>

              {/* Repayment Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Repaid: {formatMWK(loan.amountRepaidTambala)}</span>
                  <span>{repaidPct}% Paid</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${repaidPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Due Date:{' '}
                  {loan.dueDate
                    ? new Date(loan.dueDate).toLocaleDateString()
                    : 'Pending Approval'}
                </span>
                {loan.status === 'REPAYING' && onRepay && (
                  <button
                    onClick={() => onRepay(loan.id)}
                    className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg dark:bg-emerald-950/60 dark:text-emerald-300 transition-colors cursor-pointer"
                  >
                    Make Repayment
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
