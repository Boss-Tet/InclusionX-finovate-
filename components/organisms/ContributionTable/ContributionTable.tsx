import React, { useState } from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { SearchBar } from '@/components/molecules/SearchBar';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ContributionRecord } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { CreditCard, Wallet, Coins } from 'lucide-react';

export interface ContributionTableProps {
  contributions: ContributionRecord[];
  onVerify?: (id: string) => void;
}

export const ContributionTable: React.FC<ContributionTableProps> = ({
  contributions,
  onVerify,
}) => {
  const [query, setQuery] = useState('');

  const filtered = contributions.filter(
    (c) =>
      c.cyclePeriod?.toLowerCase().includes(query.toLowerCase()) ||
      c.method.toLowerCase().includes(query.toLowerCase()) ||
      c.status.toLowerCase().includes(query.toLowerCase())
  );

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'MOBILE_MONEY':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'CARD':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return <Coins className="w-4 h-4 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="success">APPROVED</Badge>;
      case 'REJECTED':
        return <Badge variant="danger">REJECTED</Badge>;
      default:
        return <Badge variant="warning">PENDING</Badge>;
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Savings & Share Contributions
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Detailed record of share-purchases and deposits
          </p>
        </div>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Filter by period or method..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No contribution records found" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-2">Cycle Period</th>
                <th className="pb-3 px-2">Amount (MWK)</th>
                <th className="pb-3 px-2">Payment Method</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Date Recorded</th>
                {onVerify && <th className="pb-3 px-2 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-200">
                    {item.cyclePeriod || 'Regular'}
                  </td>
                  <td className="py-3 px-2 font-extrabold text-emerald-700 dark:text-emerald-400">
                    {formatMWK(item.amountTambala)}
                  </td>
                  <td className="py-3 px-2">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      {getMethodIcon(item.method)}
                      {item.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-2">{getStatusBadge(item.status)}</td>
                  <td className="py-3 px-2 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  {onVerify && (
                    <td className="py-3 px-2 text-right">
                      {item.status === 'PENDING' && (
                        <button
                          onClick={() => onVerify(item.id)}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
