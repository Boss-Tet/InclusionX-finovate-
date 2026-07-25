import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800', className)}>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        Page <strong className="text-slate-800 dark:text-slate-200">{currentPage}</strong> of{' '}
        <strong className="text-slate-800 dark:text-slate-200">{totalPages}</strong>
      </span>
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<ChevronRight className="w-4 h-4" />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
