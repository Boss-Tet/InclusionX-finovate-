'use client';

import React from 'react';
import { ChairpersonShell } from '@/components/templates/ChairpersonShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { LoanVotingPanel } from '@/components/organisms/LoanVotingPanel';
import { GroupDirectory } from '@/components/organisms/GroupDirectory';
import { HealthScoreChart } from '@/components/organisms/HealthScoreChart';
import { UpcomingMeetings } from '@/components/organisms/UpcomingMeetings';
import { useLoans } from '@/hooks/useLoans';
import { useGroup } from '@/hooks/useGroup';
import { useMeetings } from '@/hooks/useMeetings';
import { CheckSquare, Users, Activity, Calendar } from 'lucide-react';

export default function ChairpersonDashboardPage() {
  const { loans, voteLoan } = useLoans();
  const { members, groupHealth } = useGroup();
  const { meetings, confirmAttendance } = useMeetings();

  const pendingLoans = loans.filter((l) => l.status === 'PENDING');

  const stats = [
    {
      label: 'Pending Votes',
      value: String(pendingLoans.length),
      subtext: 'Loan applications awaiting committee vote',
      icon: <CheckSquare className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Requires immediate action',
    },
    {
      label: 'Group Members',
      value: String(members.length),
      subtext: `In ${groupHealth.groupName}`,
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '2 new members this cycle',
    },
    {
      label: 'Health Score',
      value: groupHealth.latestScore ? `${groupHealth.latestScore.score}/100` : 'N/A',
      subtext: 'Group creditworthiness rating',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'AAA Prime Credit Tier',
    },
    {
      label: 'Scheduled Meetings',
      value: String(meetings.filter((m) => m.status === 'UPCOMING').length),
      subtext: 'Upcoming share-out assemblies',
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Next: Aug 05, 2026',
    },
  ];

  return (
    <ChairpersonShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Chairperson Governance Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Oversee approvals, member compliance, attendance, and group financial health
          </p>
        </div>

        <DashboardStats stats={stats} columns={4} />

        {groupHealth.latestScore && (
          <HealthScoreChart
            scoreData={groupHealth.latestScore}
            groupName={groupHealth.groupName}
          />
        )}

        <LoanVotingPanel pendingLoans={pendingLoans} onVote={voteLoan} />

        <GroupDirectory members={members} />

        <UpcomingMeetings meetings={meetings} onRSVP={confirmAttendance} />
      </div>
    </ChairpersonShell>
  );
}
