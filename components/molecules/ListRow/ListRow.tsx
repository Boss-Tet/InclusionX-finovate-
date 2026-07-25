import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ListRow: React.FC<ListRowProps> = ({
  title,
  subtitle,
  icon,
  rightContent,
  action,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-white dark:bg-slate-900/80 dark:border-slate-800 hover:border-emerald-200 transition-all',
        onClick && 'cursor-pointer hover:shadow-xs',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {rightContent}
        {action}
      </div>
    </div>
  );
};
