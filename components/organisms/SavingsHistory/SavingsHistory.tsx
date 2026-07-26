import React from 'react';
import { Card } from '@/components/atoms/Card';
import { formatMWK } from '@/lib/utils/money';
import { TrendingUp } from 'lucide-react';

export interface SavingsMonthData {
  month: string;
  amountTambala: number;
}

export interface SavingsHistoryProps {
  history: SavingsMonthData[];
  totalSavedTambala: number;
}

export const SavingsHistory: React.FC<SavingsHistoryProps> = ({
  history,
  totalSavedTambala,
}) => {
  const maxAmount = Math.max(...history.map((h) => h.amountTambala), 1);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Monthly Savings & Share Growth
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Accumulated Savings:{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">
              {formatMWK(totalSavedTambala)}
            </strong>
          </p>
        </div>
      </div>

      <div className="h-44 flex items-end justify-between gap-2 pt-6 border-b border-slate-100 dark:border-slate-800 pb-2">
        {history.map((item) => {
          const heightPct = Math.round((item.amountTambala / maxAmount) * 100);
          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatMWK(item.amountTambala)}
              </span>
              <div className="w-full max-w-[28px] bg-emerald-100 dark:bg-emerald-950/60 rounded-t-lg relative flex items-end justify-center h-28">
                <div
                  className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-500 group-hover:from-emerald-500 group-hover:to-teal-400"
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
