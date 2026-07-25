import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  showStatus = false,
  status = 'online',
  className,
}) => {
  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg font-bold',
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
          alt={name}
          className={cn('rounded-full object-cover shadow-sm', sizeStyles[size], className)}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-emerald-100 text-emerald-800 font-semibold flex items-center justify-center border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
            sizeStyles[size],
            className
          )}
        >
          {getInitials(name)}
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
