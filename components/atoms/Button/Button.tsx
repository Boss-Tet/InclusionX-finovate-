import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'green' | 'blue';
  loading?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
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
      theme = 'green',
      loading = false,
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isSpinning = loading || isLoading;

    const baseStyles =
      'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] select-none';

    const buildVariantStyles = {
      green: {
        primary: 'bg-[#2D7A52] hover:bg-[#1B5E3F] text-white shadow-xs focus:ring-[#2D7A52]',
        secondary: 'bg-[#E3F3EA] text-[#2D7A52] hover:bg-[#C9EAD5] focus:ring-[#2D7A52]',
        outline: 'border border-[#2D7A52] bg-white hover:bg-[#E3F3EA] text-[#2D7A52] focus:ring-[#2D7A52]',
        ghost: 'bg-transparent hover:bg-[#E3F3EA] text-[#2D7A52] focus:ring-[#2D7A52]',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-600',
      },
      blue: {
        primary: 'bg-[#2F6FED] hover:bg-[#2558C7] text-white shadow-xs focus:ring-[#2F6FED]',
        secondary: 'bg-[#E8EFFD] text-[#2F6FED] hover:bg-[#D3E2FA] focus:ring-[#2F6FED]',
        outline: 'border border-[#2F6FED] bg-white hover:bg-[#E8EFFD] text-[#2F6FED] focus:ring-[#2F6FED]',
        ghost: 'bg-transparent hover:bg-[#E8EFFD] text-[#2F6FED] focus:ring-[#2F6FED]',
        danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-600',
      },
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
        disabled={disabled || isSpinning}
        className={cn(
          baseStyles,
          buildVariantStyles[theme][variant],
          sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {isSpinning ? (
          <svg className="w-4 h-4 animate-spin shrink-0 text-current" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isSpinning && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
