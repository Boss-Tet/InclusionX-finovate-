import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {options.map((opt) => {
        const optId = `radio-${name}-${opt.value}`;
        const isChecked = selectedValue === opt.value;

        return (
          <label
            key={opt.value}
            htmlFor={optId}
            className={cn(
              'flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none',
              isChecked
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-500'
                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
            )}
          >
            <input
              id={optId}
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange?.(opt.value)}
              className="mt-0.5 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 dark:bg-slate-900 cursor-pointer"
            />
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {opt.label}
              </div>
              {opt.description && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {opt.description}
                </div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
