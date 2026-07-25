'use client';

import React from 'react';
import Link from 'next/link';
import { MemberShell } from '@/components/templates/MemberShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { SavingsHistory } from '@/components/organisms/SavingsHistory';
import { RecentTransactions } from '@/components/organisms/RecentTransactions';
import { UpcomingMeetings } from '@/components/organisms/UpcomingMeetings';
import { Card } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { useSavings } from '@/hooks/useSavings';
import { useLoans } from '@/hooks/useLoans';
import { useMeetings } from '@/hooks/useMeetings';
import { formatMWK } from '@/lib/utils/money';
import { Wallet, PiggyBank, ArrowUpRight, Bot, Calendar, Sparkles } from 'lucide-react';

export default function MemberDashboardPage() {
  const { contributions, balance, savingsHistory } = useSavings();
  const { loans } = useLoans();
  const { meetings } = useMeetings();

  const activeLoan = loans.find((l) => l.status === 'REPAYING') || loans[0];

  const stats = [
    {
      label: 'My Total Savings',
      value: formatMWK(balance.totalContributedTambala),
      subtext: `Approved: ${formatMWK(balance.approvedContributions)}`,
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '+12% from last cycle',
    },
    {
      label: 'Active Loan Principal',
      value: activeLoan ? formatMWK(activeLoan.principalTambala) : 'MWK 0.00',
      subtext: activeLoan ? `Status: ${activeLoan.status}` : 'No active loans',
      icon: <PiggyBank className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Repayment in progress',
    },
    {
      label: 'Remaining Loan Due',
      value: activeLoan ? formatMWK(activeLoan.remainingDueTambala) : 'MWK 0.00',
      subtext: activeLoan ? `Interest: ${activeLoan.interestRate}%` : 'Clear status',
      icon: <ArrowUpRight className="w-5 h-5 text-emerald-600" />,
      trend: 'down' as const,
      trendText: 'Due on Aug 13, 2026',
    },
  ];

  return (
    <MemberShell>
      <div className="space-y-6">
        {/* KPI Stats Cards */}
        <DashboardStats stats={stats} columns={3} />

        {/* AI Shortcut Banner */}
        <Card className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5 text-white">
                VSLA AI Financial Advisor <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Check your loan eligibility, calculate interest rates, or query health scores instantly.
              </p>
            </div>
          </div>
          <Link href="/ai-assistant">
            <Button variant="secondary" size="md" className="shrink-0 bg-white text-emerald-900 hover:bg-emerald-50">
              Ask AI Assistant
            </Button>
          </Link>
        </Card>

        {/* Savings Growth & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SavingsHistory
            history={savingsHistory}
            totalSavedTambala={balance.totalContributedTambala}
          />
          <RecentTransactions contributions={contributions} />
        </div>

        {/* Upcoming Meetings */}
        <UpcomingMeetings meetings={meetings} />
      </div>
    </MemberShell>
  );
}
