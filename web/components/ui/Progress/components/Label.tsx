'use client';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { type FC } from 'react';

// types
import type { LabelProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Label: FC<Props> = ({ className, ...props }) => {
  return (
    <ProgressPrimitive.Label className={cn('text-sm font-medium', className)} data-slot="progress-label" {...props} />
  );
};

export default Label;
