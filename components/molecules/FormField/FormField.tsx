import React from 'react';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/lib/utils/cn';

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  hint,
  children,
  className,
}) => {
  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && <Label required={required}>{label}</Label>}
      <div>{children}</div>
      {error ? (
        <p className="text-xs text-rose-500 font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
};
