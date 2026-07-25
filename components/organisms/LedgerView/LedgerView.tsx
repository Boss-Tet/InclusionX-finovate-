import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { LedgerEntryRecord } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { BookOpen, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export interface LedgerViewProps {
  entries: LedgerEntryRecord[];
}

export const LedgerView: React.FC<LedgerViewProps> = ({ entries }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Immutable Group Cashbook Ledger
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Audit-ready journal of credits, disbursements, repayments, and withdrawals
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
              <th className="pb-3 px-2">Timestamp</th>
              <th className="pb-3 px-2">Type</th>
              <th className="pb-3 px-2">Direction</th>
              <th className="pb-3 px-2">Amount (MWK)</th>
              <th className="pb-3 px-2">Balance After</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {entries.map((entry) => {
              const isCredit = entry.direction === 'CREDIT';
              return (
                <tr key={entry.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-2 text-slate-500">
                    {new Date(entry.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-800 dark:text-slate-200">
                    {entry.entryType.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={isCredit ? 'success' : 'danger'}>
                      <span className="flex items-center gap-1">
                        {isCredit ? (
                          <ArrowDownLeft className="w-3 h-3" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3" />
                        )}
                        {entry.direction}
                      </span>
                    </Badge>
                  </td>
                  <td
                    className={`py-3 px-2 font-extrabold ${
                      isCredit
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {isCredit ? '+' : '-'} {formatMWK(entry.amountTambala)}
                  </td>
                  <td className="py-3 px-2 font-bold text-slate-900 dark:text-slate-100">
                    {entry.balanceAfter !== null ? formatMWK(entry.balanceAfter) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
