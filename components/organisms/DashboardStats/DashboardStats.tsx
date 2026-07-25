import React from 'react';
import { Card } from '@/components/atoms/Card';
import { cn } from '@/lib/utils/cn';

export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
}

export interface DashboardStatsProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  columns = 4,
}) => {
  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', colStyles[columns])}>
      {stats.map((stat, i) => (
        <Card key={i} variant="hover" className="space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {stat.label}
            </span>
            {stat.icon && (
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                {stat.icon}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {stat.value}
            </h3>
            {stat.subtext && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stat.subtext}
              </p>
            )}
          </div>

          {stat.trendText && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  'font-bold',
                  stat.trend === 'up'
                    ? 'text-emerald-600'
                    : stat.trend === 'down'
                    ? 'text-rose-600'
                    : 'text-slate-500'
                )}
              >
                {stat.trendText}
              </span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
