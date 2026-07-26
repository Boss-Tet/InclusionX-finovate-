import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { NotificationRecord } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils/cn';

export interface NotificationItemProps {
  notification: NotificationRecord;
  onMarkRead?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
}) => {
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
      <Bell className="w-5 h-5 text-slate-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {notification.title}
          </h4>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {new Date(notification.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
          {notification.body}
        </p>
      </div>
      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
      )}
    </div>
  );
};
