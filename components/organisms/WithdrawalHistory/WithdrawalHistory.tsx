import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { WithdrawalWithVotes } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { LogOut, Plus } from 'lucide-react';

export interface WithdrawalHistoryProps {
  withdrawals: WithdrawalWithVotes[];
  onRequestNew?: () => void;
}

export const WithdrawalHistory: React.FC<WithdrawalHistoryProps> = ({
  withdrawals,
  onRequestNew,
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      default:
        return 'warning';
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <LogOut className="w-5 h-5 text-emerald-600" />
            Withdrawal & Share-Out Requests
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Emergency capital withdrawals and end-of-cycle share payouts
          </p>
        </div>
        {onRequestNew && (
          <button
            onClick={onRequestNew}
            className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Request Withdrawal
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="pb-3 px-2">Requested On</th>
              <th className="pb-3 px-2">Amount (MWK)</th>
              <th className="pb-3 px-2">Reason</th>
              <th className="pb-3 px-2">Quorum Votes</th>
              <th className="pb-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {withdrawals.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-2 text-slate-500">
                  {new Date(w.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-2 font-extrabold text-slate-900 dark:text-slate-100">
                  {formatMWK(w.amountTambala)}
                </td>
                <td className="py-3 px-2 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                  {w.reason}
                </td>
                <td className="py-3 px-2 font-semibold">
                  {w.approveCount} / {w.quorumNeeded} Needed
                </td>
                <td className="py-3 px-2">
                  <Badge variant={getStatusVariant(w.status)}>{w.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
