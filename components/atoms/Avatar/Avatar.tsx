import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface AvatarProps {
  src?: string;
  name?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'green' | 'blue' | 'purple' | 'orange' | 'red' | 'gray';
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy';
  alt?: string;
  className?: string;
}

const themeStyles: Record<string, string> = {
  green:  "bg-[#2D7A52] text-white",
  blue:   "bg-[#2F6FED] text-white",
  purple: "bg-[#8B5CF6] text-white",
  orange: "bg-[#E8873A] text-white",
  red:    "bg-[#DC2626] text-white",
  gray:   "bg-[#9AA6BC] text-white",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  initials,
  size = 'md',
  theme = 'green',
  showStatus = false,
  status = 'online',
  alt = 'User avatar',
  className,
}) => {
  const displayInitials = initials ?? (name ? (name.trim().split(' ').length >= 2 ? `${name.trim().split(' ')[0][0]}${name.trim().split(' ')[1][0]}` : name.slice(0, 2)).toUpperCase() : 'U');

  const sizeStyles = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg font-extrabold',
  };

  const statusColors = {
    online: 'bg-emerald-500 ring-2 ring-white dark:ring-slate-900',
    offline: 'bg-slate-400 ring-2 ring-white dark:ring-slate-900',
    busy: 'bg-amber-500 ring-2 ring-white dark:ring-slate-900',
  };

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      {src ? (
        <img
          src={src}
          alt={name || alt}
          className={cn('rounded-full object-cover shadow-sm', sizeStyles[size], className)}
        />
      ) : (
        <div
          className={cn(
            'rounded-full font-bold flex items-center justify-center border border-white/20 select-none',
            themeStyles[theme] || themeStyles.green,
            sizeStyles[size],
            className
          )}
        >
          {displayInitials}
        </div>
      )}
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full w-3 h-3',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};
