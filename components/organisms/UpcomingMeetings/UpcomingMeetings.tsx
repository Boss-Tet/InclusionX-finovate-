import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

// Compatible with both real API MeetingRecord and mock MeetingRecord
export interface MeetingDisplay {
  id: string;
  title: string;
  scheduledAt?: string; // real API field
  date?: string;        // mock field
  time?: string;
  location?: string | null;
  status: string;
  agendaNotes?: string | null;
  agenda?: string;
}

export interface UpcomingMeetingsProps {
  meetings: MeetingDisplay[];
  onRSVP?: (meetingId: string, memberId?: string) => void;
}

export const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({
  meetings,
  onRSVP,
}) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            VSLA Group Meetings & Share-Outs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Scheduled share purchases, voting assemblies, and audit checks
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {meetings.map((m) => {
          const displayDate = m.scheduledAt
            ? new Date(m.scheduledAt).toLocaleDateString()
            : (m.date ?? '');
          const displayAgenda = m.agendaNotes ?? m.agenda ?? '';
          const isActive = m.status === 'UPCOMING' || m.status === 'SCHEDULED';
          return (
          <div
            key={m.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 dark:bg-slate-800/40 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {m.title}
                </h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" /> {displayDate}
                  </span>
                  {m.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> {m.time}
                    </span>
                  )}
                  {m.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {m.location}
                    </span>
                  )}
                </div>
              </div>
              <Badge variant={isActive ? 'success' : 'neutral'}>
                {m.status}
              </Badge>
            </div>

            {displayAgenda && (
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                <strong className="text-slate-800 dark:text-slate-200">Agenda: </strong>
                {displayAgenda}
              </div>
            )}

            {isActive && onRSVP && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onRSVP(m.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Attendance
                </button>
              </div>
            )}
          </div>
          );
        })}
      </div>
    </Card>
  );
};
