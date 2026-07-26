import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { HealthScoreBreakdown } from '@/types/financial';
import { Activity, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';

export interface HealthScoreChartProps {
  scoreData: HealthScoreBreakdown;
  groupName?: string;
}

export const HealthScoreChart: React.FC<HealthScoreChartProps> = ({
  scoreData,
  groupName = 'Tiyanjane Women VSLA',
}) => {
  const getRatingLabel = (score: number) => {
    if (score >= 90) return { label: 'AAA Prime Credit', variant: 'emerald' as const };
    if (score >= 80) return { label: 'AA High Liquidity', variant: 'success' as const };
    if (score >= 70) return { label: 'A Moderate Risk', variant: 'warning' as const };
    return { label: 'B Underperforming', variant: 'danger' as const };
  };

  const rating = getRatingLabel(scoreData.score);

  const metrics = [
    {
      label: 'Savings Compliance',
      score: scoreData.savingsComponent,
      max: 35,
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      color: 'bg-emerald-600',
    },
    {
      label: 'Loan Repayment Rate',
      score: scoreData.repaymentComponent,
      max: 35,
      icon: <ShieldCheck className="w-4 h-4 text-sky-600" />,
      color: 'bg-sky-600',
    },
    {
      label: 'Meeting Attendance',
      score: scoreData.attendanceComponent,
      max: 20,
      icon: <Users className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-600',
    },
    {
      label: 'Governance & Audit',
      score: scoreData.governanceComponent,
      max: 10,
      icon: <Award className="w-4 h-4 text-purple-600" />,
      color: 'bg-purple-600',
    },
  ];

  return (
    <Card className="space-y-5 border border-emerald-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Group Credit & Financial Health Score
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {groupName} • Computed on {new Date(scoreData.computedAt).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={rating.variant} size="md">
          {rating.label}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-emerald-950 text-white">
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-emerald-500/40 bg-emerald-950/60 shrink-0">
          <div className="text-center">
            <span className="text-3xl font-extrabold text-emerald-400">
              {scoreData.score}
            </span>
            <span className="block text-[10px] text-emerald-200 font-semibold uppercase tracking-wider">
              Out of 100
            </span>
          </div>
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-emerald-200">
            Financial Creditworthiness Rating
          </h4>
          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            This composite health score determines group bank loan eligibility, interest rate subsidies, and financial inclusion tier.
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Component Breakdown
        </h4>
        {metrics.map((m) => {
          const pct = Math.round((m.score / m.max) * 100);
          return (
            <div key={m.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {m.icon}
                  {m.label}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {m.score} / {m.max} ({pct}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
