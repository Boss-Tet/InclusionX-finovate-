import React from 'react';
import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

    const variantStyles = {
      primary:
        'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/40',
      secondary:
        'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
      outline:
        'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
      ghost:
        'bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30 hover:shadow-md',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
      md: 'px-4 py-2.5 text-sm font-semibold gap-2',
      lg: 'px-6 py-3.5 text-base font-semibold gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
