'use client';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { type FC } from 'react';

// types
import type { ValueProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Value: FC<Props> = ({ className, ...props }) => {
  return (
    <ProgressPrimitive.Value
      className={cn('ml-auto text-sm text-muted-foreground tabular-nums', className)}
      data-slot="progress-value"
      {...props}
    />
  );
};

export default Value;
