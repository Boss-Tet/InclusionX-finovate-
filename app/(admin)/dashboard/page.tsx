'use client';

import React from 'react';
import { AdminShell } from '@/components/templates/AdminShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { GroupDirectory } from '@/components/organisms/GroupDirectory';
import { MOCK_ADMIN_METRICS, MOCK_SYSTEM_LOGS } from '@/lib/mock/adminMock';
import { MOCK_USERS } from '@/lib/mock/authMock';
import { formatMWK } from '@/lib/utils/money';
import { Users, Building2, Activity, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminDashboardPage() {
  const allUsers = Object.values(MOCK_USERS);

  const stats = [
    {
      label: 'Total Registered Users',
      value: MOCK_ADMIN_METRICS.totalUsers.toLocaleString(),
      subtext: 'Across all VSLA groups',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '+124 new users this month',
    },
    {
      label: 'Active VSLA Groups',
      value: String(MOCK_ADMIN_METRICS.activeGroups),
      subtext: 'Verified operating circles',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '3 new groups onboarded',
    },
    {
      label: 'Platform Total Savings',
      value: formatMWK(MOCK_ADMIN_METRICS.totalSavingsTambala),
      subtext: 'Across all VSLA cashboxes',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '+MWK 2.4M from last month',
    },
    {
      label: 'Avg. Platform Health Score',
      value: `${MOCK_ADMIN_METRICS.healthScoreAvg}/100`,
      subtext: 'Portfolio creditworthiness average',
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'AA High Tier',
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
            System Administration Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Full platform oversight — users, groups, security events, and system health metrics
          </p>
        </div>

        <DashboardStats stats={stats} columns={4} />

        {/* System Audit Logs */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-600" />
            System Security Audit Logs
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">Timestamp</th>
                  <th className="pb-3 px-2">Action</th>
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Role</th>
                  <th className="pb-3 px-2">IP Address</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {MOCK_SYSTEM_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{log.user}</td>
                    <td className="py-3 px-2">
                      <Badge variant="neutral" size="sm">{log.role}</Badge>
                    </td>
                    <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'text-emerald-600'
                          : log.status === 'FAILED'
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}>
                        {log.status === 'SUCCESS' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* User Directory */}
        <GroupDirectory members={allUsers} />
      </div>
    </AdminShell>
  );
}
