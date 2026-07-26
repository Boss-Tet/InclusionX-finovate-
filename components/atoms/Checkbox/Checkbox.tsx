import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || (label ? `chk-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            'w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 dark:border-slate-700 dark:bg-slate-900 cursor-pointer',
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
