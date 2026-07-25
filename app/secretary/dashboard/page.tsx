'use client';

import React, { useState } from 'react';
import { SecretaryShell } from '@/components/templates/SecretaryShell';
import { DashboardStats } from '@/components/organisms/DashboardStats';
import { UpcomingMeetings } from '@/components/organisms/UpcomingMeetings';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Modal } from '@/components/atoms/Modal';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { TextArea } from '@/components/atoms/TextArea';
import { useMeetings } from '@/hooks/useMeetings';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from '@/components/molecules/NotificationItem';
import { Calendar, FileText, Bell, Plus } from 'lucide-react';

export default function SecretaryDashboardPage() {
  const { meetings, confirmAttendance } = useMeetings();
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [isMinutesOpen, setIsMinutesOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  const completedMeetings = meetings.filter((m) => m.status === 'COMPLETED');
  const upcomingMeetings = meetings.filter((m) => m.status === 'UPCOMING');

  const stats = [
    {
      label: 'Upcoming Meetings',
      value: String(upcomingMeetings.length),
      subtext: 'Scheduled assemblies this cycle',
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Next on Aug 05',
    },
    {
      label: 'Meetings Recorded',
      value: String(completedMeetings.length),
      subtext: 'With minutes documented',
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      trend: 'up' as const,
      trendText: '100% minutes completion',
    },
    {
      label: 'Unread Alerts',
      value: String(unreadCount),
      subtext: 'Pending member notifications',
      icon: <Bell className="w-5 h-5 text-emerald-600" />,
      trend: 'neutral' as const,
      trendText: 'Requires dispatch',
    },
  ];

  return (
    <SecretaryShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Secretary Administration Panel
            </h1>
            <p className="text-xs text-slate-500">
              Manage meeting schedules, attendance records, minutes, and group communications
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsMinutesOpen(true)}
          >
            Record Minutes
          </Button>
        </div>

        <DashboardStats stats={stats} columns={3} />

        <UpcomingMeetings meetings={meetings} onRSVP={confirmAttendance} />

        {/* Meeting Minutes Panel */}
        {completedMeetings.length > 0 && (
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              Recorded Meeting Minutes Archive
            </h3>
            <div className="space-y-3">
              {completedMeetings.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{m.title}</h4>
                    <Badge variant="neutral">{m.date}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {m.minutes || 'Minutes not yet recorded'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Attendance: {m.attendeesCount}/{m.totalMembers} members present
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Notifications Panel */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            Member Notifications Queue
            {unreadCount > 0 && (
              <Badge variant="emerald" size="sm">{unreadCount} unread</Badge>
            )}
          </h3>
          <div className="space-y-2">
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onMarkRead={markAsRead} />
            ))}
          </div>
        </Card>
      </div>

      {/* Minutes Modal */}
      <Modal
        isOpen={isMinutesOpen}
        onClose={() => setIsMinutesOpen(false)}
        title="Record Meeting Minutes"
        description="Document agenda outcomes, resolutions, and attendance"
        maxWidth="lg"
      >
        <form onSubmit={(e) => { e.preventDefault(); setIsMinutesOpen(false); }} className="space-y-4">
          <FormField label="Meeting Title" required>
            <Input placeholder="e.g. Monthly Share Purchase Assembly" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Date">
              <Input type="date" />
            </FormField>
            <FormField label="Members Present">
              <Input type="number" placeholder="25" />
            </FormField>
          </div>
          <FormField label="Minutes & Resolutions" required>
            <TextArea rows={5} placeholder="Summarise key agenda items, votes, financial outcomes, and action items..." />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsMinutesOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Minutes</Button>
          </div>
        </form>
      </Modal>
    </SecretaryShell>
  );
}
