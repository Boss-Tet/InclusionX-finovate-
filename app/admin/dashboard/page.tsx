'use client';

import React, { useState, useEffect } from 'react';
import { AdminShell } from '@/components/templates/AdminShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { GroupDirectory } from '@/components/organisms/GroupDirectory';
import { MOCK_SYSTEM_LOGS } from '@/lib/mock/adminMock';
import { formatMWK } from '@/lib/utils/money';
import { Users, Building2, Activity, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface AdminMetrics {
  totalUsers: number;
  activeGroups: number;
  totalSavingsTambala: number;
  healthScoreAvg: number;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [metricsRes, usersRes] = await Promise.all([
          fetch('/api/admin/metrics'),
          fetch('/api/admin/users'),
        ]);

        if (metricsRes.ok) {
          const metricsJson = await metricsRes.json();
          setMetrics(metricsJson.data);
        }
        
        if (usersRes.ok) {
          const usersJson = await usersRes.json();
          setUsers(usersJson.data);
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const stats = [
    {
      label: 'Total Registered Users',
      value: metrics ? metrics.totalUsers.toLocaleString() : '...',
      subtext: 'Across all VSLA groups',
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'Live tracking',
    },
    {
      label: 'Active VSLA Groups',
      value: metrics ? String(metrics.activeGroups) : '...',
      subtext: 'Verified operating circles',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'Live tracking',
    },
    {
      label: 'Platform Total Savings',
      value: metrics ? formatMWK(metrics.totalSavingsTambala) : '...',
      subtext: 'Across all VSLA cashboxes',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'Live tracking',
    },
    {
      label: 'Avg. Platform Health Score',
      value: metrics ? `${metrics.healthScoreAvg}/100` : '...',
      subtext: 'Portfolio creditworthiness average',
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: 'Live tracking',
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
            System Security Audit Logs (Demo)
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
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Platform Directory
          </h3>
          <GroupDirectory members={users} />
        </div>
      </div>
    </AdminShell>
  );
}
