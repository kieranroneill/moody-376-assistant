'use client';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { type FC } from 'react';

// types
import type { TrackProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Track: FC<Props> = ({ className, ...props }) => {
  return (
    <ProgressPrimitive.Track
      className={cn('relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted', className)}
      data-slot="progress-track"
      {...props}
    />
  );
};

export default Track;
