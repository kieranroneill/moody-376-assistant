'use client';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { type FC } from 'react';

// types
import type { IndicatorProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Indicator: FC<Props> = ({ className, ...props }) => {
  return (
    <ProgressPrimitive.Indicator
      className={cn('h-full bg-primary transition-all', className)}
      data-slot="progress-indicator"
      {...props}
    />
  );
};

export default Indicator;
