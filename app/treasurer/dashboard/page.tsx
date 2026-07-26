'use client';

import React from 'react';
import { TreasurerShell } from '@/components/templates/TreasurerShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { ContributionTable } from '@/components/organisms/ContributionTable';
import { LedgerView } from '@/components/organisms/LedgerView';
import { useSavings } from '@/hooks/useSavings';
import { useLoans } from '@/hooks/useLoans';
import { useGroup } from '@/hooks/useGroup';
import { useLedger } from '@/hooks/useLedger';
import { formatMWK } from '@/lib/utils/money';
import { Wallet, PiggyBank, TrendingDown, ArrowDownLeft } from 'lucide-react';

export default function TreasurerDashboardPage() {
  const groupId = typeof window !== 'undefined' ? localStorage.getItem('vsla_active_group_id') ?? '' : '';
  const { contributions, approveContribution } = useSavings({ groupId });
  const { loans } = useLoans({ groupId });
  const { group } = useGroup(groupId);
  const { entries: ledgerEntries } = useLedger({ groupId });

  // Real treasury balance from group pool, falls back to 0 while loading
  const totalGroupBalance = group?.totalPoolTambala ?? 0;
  const totalLoansDisbursed = loans.reduce((acc, l) => acc + l.principalTambala, 0);
  const totalRepaid = loans.reduce((acc, l) => acc + l.amountRepaidTambala, 0);
  // Compute live repayment rate from actual disbursed vs repaid amounts
  const repaymentRatePct = totalLoansDisbursed > 0
    ? Math.round((totalRepaid / totalLoansDisbursed) * 100)
    : 0;

  const stats = [
    {
      label: 'Group Treasury Balance',
      value: formatMWK(totalGroupBalance),
      subtext: 'Verified cashbox balance',
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '+8.2% from last cycle',
    },
    {
      label: 'Total Loans Disbursed',
      value: formatMWK(totalLoansDisbursed),
      subtext: `Across ${loans.length} active loan records`,
      icon: <PiggyBank className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Active lending portfolio',
    },
    {
      label: 'Total Repayments Received',
      value: formatMWK(totalRepaid),
      subtext: 'Including interest income',
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: `${repaymentRatePct}% repayment rate`,
    },
    {
      label: 'Pending Verification',
      value: String(contributions.filter((c) => c.status === 'PENDING').length),
      subtext: 'Shares awaiting treasurer approval',
      icon: <TrendingDown className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Action required',
    },
  ];

  return (
    <TreasurerShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Treasurer Financial Control Panel
          </h1>
          <p className="text-xs text-slate-500">
            Real-time cashbox balance, share verification, disbursement control, and cashflow audit
          </p>
        </div>

        <DashboardStats stats={stats} columns={4} />

        <ContributionTable
          contributions={contributions}
          onVerify={(id) => approveContribution(id, 'APPROVE')}
        />

        <LedgerView entries={ledgerEntries} />
      </div>
    </TreasurerShell>
  );
}
