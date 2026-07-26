import React from 'react';
import { cn } from '@/lib/utils/cn';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputTheme = 'green' | 'blue';
export type InputState = 'default' | 'error' | 'success';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  theme?: InputTheme;
  state?: InputState;
  label?: string;
  hint?: string;
  errorMessage?: string;
  error?: boolean;
  fullWidth?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  /** @deprecated use prefixIcon */
  leftIcon?: React.ReactNode;
  /** @deprecated use suffixIcon */
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize = 'md',
      theme = 'green',
      state,
      label,
      hint,
      errorMessage,
      error,
      fullWidth = false,
      prefixIcon,
      suffixIcon,
      leftIcon,
      rightIcon,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const resolvedState: InputState = error ? 'error' : state ?? 'default';
    const prefix = prefixIcon ?? leftIcon;
    const suffix = suffixIcon ?? rightIcon;
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const sizeStyles: Record<InputSize, string> = {
      sm: 'py-1.5 px-3 text-[12px] rounded-[8px]',
      md: 'py-2.5 px-3.5 text-[13px] rounded-[10px]',
      lg: 'py-3 px-4 text-[14px] rounded-[12px]',
    };

    const themeRing: Record<InputTheme, Record<InputState, string>> = {
      green: {
        default: 'border-[#E9EDEA] focus-within:border-[#2D7A52] focus-within:ring-2 focus-within:ring-[#2D7A52]/20',
        error:   'border-[#DC4B3F] ring-2 ring-[#DC4B3F]/20',
        success: 'border-[#2D7A52] ring-2 ring-[#2D7A52]/20',
      },
      blue: {
        default: 'border-[#EBEEF4] focus-within:border-[#2F6FED] focus-within:ring-2 focus-within:ring-[#2F6FED]/20',
        error:   'border-[#DC4B3F] ring-2 ring-[#DC4B3F]/20',
        success: 'border-[#16A34A] ring-2 ring-[#16A34A]/20',
      },
    };

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth ? 'w-full' : '')}>
        {label && (
          <label htmlFor={inputId} className="text-[12.5px] font-semibold text-[#1B2321]">
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex items-center gap-2 border bg-white transition-all duration-150',
            sizeStyles[inputSize],
            themeRing[theme][resolvedState],
            fullWidth ? 'w-full' : ''
          )}
        >
          {prefix && <span className="shrink-0 text-[#94A29C]">{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'flex-1 bg-transparent border-none outline-none text-[#1B2321] placeholder:text-[#94A29C] font-medium disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
          {suffix && <span className="shrink-0 text-[#94A29C]">{suffix}</span>}
        </div>

        {resolvedState === 'error' && errorMessage && (
          <p className="text-[11.5px] text-[#DC4B3F] font-medium">{errorMessage}</p>
        )}
        {resolvedState !== 'error' && hint && (
          <p className="text-[11.5px] text-[#94A29C] font-medium">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
