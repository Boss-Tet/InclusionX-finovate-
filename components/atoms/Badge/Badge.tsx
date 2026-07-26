import React from 'react';
import { cn } from '@/lib/utils/cn';

export type BadgeVariant =
  | 'green'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'red'
  | 'gray'
  | 'teal'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'emerald';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  dot = false,
  className,
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    green:  'bg-[#E3F3EA] text-[#1B5E3F] border-[#C9EAD5]',
    blue:   'bg-[#E8EFFD] text-[#1E4C99] border-[#D3E2FA]',
    purple: 'bg-[#EFE9F9] text-[#5E35B1] border-[#E2D6F5]',
    orange: 'bg-[#FCEADC] text-[#9A5518] border-[#FBDCC0]',
    red:    'bg-[#FDEAEA] text-[#B71C1C] border-[#FBC8C6]',
    gray:   'bg-[#EEF0F4] text-[#5C6B85] border-[#E2E6EE]',
    teal:   'bg-[#E1F6F3] text-[#0D9488] border-[#C5ECE7]',
    success:'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning:'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info:   'bg-sky-50 text-sky-700 border-sky-200',
    neutral:'bg-slate-100 text-slate-700 border-slate-200',
    emerald:'bg-emerald-600 text-white border-transparent font-bold shadow-xs',
  };

  const dotColors: Record<BadgeVariant, string> = {
    green:  'bg-[#2D7A52]',
    blue:   'bg-[#2F6FED]',
    purple: 'bg-[#8B6FC7]',
    orange: 'bg-[#E8873A]',
    red:    'bg-[#DC4B3F]',
    gray:   'bg-[#9AA6BC]',
    teal:   'bg-[#0D9488]',
    success:'bg-emerald-500',
    warning:'bg-amber-500',
    danger: 'bg-rose-500',
    info:   'bg-sky-500',
    neutral:'bg-slate-500',
    emerald:'bg-white',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-bold gap-1.5',
    md: 'px-2.5 py-1 text-xs font-bold gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {icon}
      <span>{children}</span>
    </span>
  );
};
