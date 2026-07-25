import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'flat' | 'gradient';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default:
        'bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800',
      hover:
        'bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-800',
      flat:
        'bg-slate-50 border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800/80',
      gradient:
        'bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0 shadow-md shadow-emerald-700/20',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-xl p-5 sm:p-6', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
