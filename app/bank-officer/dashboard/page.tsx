'use client';

import React from 'react';
import { BankOfficerShell } from '@/components/templates/BankOfficerShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { HealthScoreChart } from '@/components/organisms/HealthScoreChart';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { MOCK_HEALTH_SUMMARIES } from '@/lib/mock/healthScoreMock';
import { formatMWK } from '@/lib/utils/money';
import { Building2, BarChart2, ShieldCheck, TrendingUp, Users, Activity } from 'lucide-react';

export default function BankOfficerDashboardPage() {
  const totalGroups = MOCK_HEALTH_SUMMARIES.length;
  const avgScore = Math.round(
    MOCK_HEALTH_SUMMARIES.reduce((acc, g) => acc + (g.latestScore?.score || 0), 0) / totalGroups
  );
  const totalMembers = MOCK_HEALTH_SUMMARIES.reduce((a, g) => a + g.memberCount, 0);

  const stats = [
    {
      label: 'Active VSLA Groups',
      value: String(totalGroups),
      subtext: 'Under bank portfolio monitoring',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '+2 new groups this quarter',
    },
    {
      label: 'Portfolio Members',
      value: String(totalMembers),
      subtext: 'Enrolled financial inclusion beneficiaries',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'Expanding coverage',
    },
    {
      label: 'Average Health Score',
      value: `${avgScore}/100`,
      subtext: 'Composite credit rating across all VSLAs',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'AA High Liquidity Tier',
    },
    {
      label: 'Eligible for Loan',
      value: String(MOCK_HEALTH_SUMMARIES.filter((g) => (g.latestScore?.score || 0) >= 80).length),
      subtext: 'Groups qualifying for bank micro-credit',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Score ≥ 80 required',
    },
  ];

  return (
    <BankOfficerShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Bank Partner VSLA Portfolio Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Monitor group financial health scores, loan eligibility tiers, and portfolio risk analytics
          </p>
        </div>

        <DashboardStats stats={stats} columns={4} />

        {/* All VSLAs Health Score Cards */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            VSLA Group Credit Portfolio Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">Group Name</th>
                  <th className="pb-3 px-2">Members</th>
                  <th className="pb-3 px-2">Health Score</th>
                  <th className="pb-3 px-2">Last Assessment</th>
                  <th className="pb-3 px-2">Loan Eligibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {MOCK_HEALTH_SUMMARIES.map((group) => {
                  const score = group.latestScore?.score || 0;
                  const eligible = score >= 80;
                  return (
                    <tr key={group.groupId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-200">
                        {group.groupName}
                      </td>
                      <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                        {group.memberCount} members
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            {score}/100
                          </span>
                          <div className="w-20 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-slate-500">
                        {group.latestScore
                          ? new Date(group.latestScore.computedAt).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={eligible ? 'success' : 'warning'}>
                          {eligible ? 'Eligible' : 'Below Threshold'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Detailed Health Score for Top Group */}
        {MOCK_HEALTH_SUMMARIES[0].latestScore && (
          <HealthScoreChart
            scoreData={MOCK_HEALTH_SUMMARIES[0].latestScore}
            groupName={MOCK_HEALTH_SUMMARIES[0].groupName}
          />
        )}
      </div>
    </BankOfficerShell>
  );
}
