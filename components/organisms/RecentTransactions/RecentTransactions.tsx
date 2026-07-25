import React from 'react';
import { Card } from '@/components/atoms/Card';
import { ListRow } from '@/components/molecules/ListRow';
import { Badge } from '@/components/atoms/Badge';
import { ContributionRecord } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export interface RecentTransactionsProps {
  contributions: ContributionRecord[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  contributions,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Recent Member Transactions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Latest deposits & loan disbursements
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {contributions.slice(0, 5).map((c) => (
          <ListRow
            key={c.id}
            title={`Share Contribution (${c.method.replace('_', ' ')})`}
            subtitle={`Cycle: ${c.cyclePeriod || 'Regular'} • ${new Date(c.createdAt).toLocaleDateString()}`}
            icon={<ArrowDownLeft className="w-5 h-5 text-emerald-600" />}
            rightContent={
              <div className="text-right">
                <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                  +{formatMWK(c.amountTambala)}
                </p>
                <Badge size="sm" variant={c.status === 'APPROVED' ? 'success' : 'warning'}>
                  {c.status}
                </Badge>
              </div>
            }
          />
        ))}
      </div>
    </Card>
  );
};
