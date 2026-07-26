'use client';

import React from 'react';
import { TreasurerShell } from '@/components/templates/TreasurerShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { ContributionTable } from '@/components/organisms/ContributionTable';
import { LedgerView } from '@/components/organisms/LedgerView';
import { Card } from '@/components/atoms/Card';
import { useSavings } from '@/hooks/useSavings';
import { useLoans } from '@/hooks/useLoans';
import { LedgerEntryRecord } from '@/types/financial';
import { formatMWK } from '@/lib/utils/money';
import { Wallet, PiggyBank, TrendingDown, ArrowDownLeft } from 'lucide-react';

// Mock ledger entries for display
const MOCK_LEDGER: LedgerEntryRecord[] = [
  {
    id: 'led-001',
    groupId: 'grp-001',
    entryType: 'CONTRIBUTION',
    referenceId: 'contrib-001',
    amountTambala: 2500000,
    direction: 'CREDIT',
    balanceAfter: 485000000,
    reversalOfId: null,
    reason: 'Monthly July share purchase - Chifundo Banda',
    createdAt: new Date('2026-07-01T10:00:00Z'),
  },
  {
    id: 'led-002',
    groupId: 'grp-001',
    entryType: 'LOAN_DISBURSEMENT',
    referenceId: 'loan-001',
    amountTambala: 15000000,
    direction: 'DEBIT',
    balanceAfter: 470000000,
    reversalOfId: null,
    reason: 'Loan disbursement - Chifundo Banda',
    createdAt: new Date('2026-05-13T09:00:00Z'),
  },
  {
    id: 'led-003',
    groupId: 'grp-001',
    entryType: 'LOAN_REPAYMENT',
    referenceId: 'repay-001',
    amountTambala: 3500000,
    direction: 'CREDIT',
    balanceAfter: 473500000,
    reversalOfId: null,
    reason: 'Loan installment repayment - loan-001',
    createdAt: new Date('2026-06-15T10:00:00Z'),
  },
];

export default function TreasurerDashboardPage() {
  const groupId = typeof window !== 'undefined' ? localStorage.getItem('vsla_active_group_id') ?? '' : '';
  const { contributions, approveContribution } = useSavings({ groupId });
  const { loans } = useLoans({ groupId });

  const totalGroupBalance = 48500000; // MWK 485,000.00 (mock)
  const totalLoansDisbursed = loans.reduce((acc, l) => acc + l.principalTambala, 0);
  const totalRepaid = loans.reduce((acc, l) => acc + l.amountRepaidTambala, 0);

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
      trendText: '96% repayment rate',
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

        <LedgerView entries={MOCK_LEDGER} />
      </div>
    </TreasurerShell>
  );
}
