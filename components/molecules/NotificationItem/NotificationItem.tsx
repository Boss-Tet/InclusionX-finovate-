import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Compatible with both real API NotificationRecord and mock NotificationRecord
export interface NotificationDisplay {
  id: string;
  title: string;
  body?: string;       // real API field
  message?: string;    // mock field
  timestamp?: string;
  createdAt?: string;
  type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  channel?: string;
  read: boolean;
}

export interface NotificationItemProps {
  notification: NotificationDisplay;
  onMarkRead?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
}) => {
  const icons = {
    SUCCESS: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    WARNING: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />,
    ALERT: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    INFO: <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />,
  };

  return (
    <div
      onClick={() => onMarkRead?.(notification.id)}
      className={cn(
        'flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer',
        notification.read
          ? 'bg-white border-slate-100 dark:bg-slate-900/60 dark:border-slate-800 opacity-80'
          : 'bg-emerald-50/40 border-emerald-200/80 shadow-xs dark:bg-emerald-950/20 dark:border-emerald-800'
      )}
    >
      {(notification.type && notification.type in icons) ? icons[notification.type] : <Bell className="w-5 h-5 text-slate-400 shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {notification.title}
          </h4>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {notification.timestamp ?? (notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : '')}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          {notification.body ?? notification.message}
        </p>
      </div>
      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
      )}
    </div>
  );
};
