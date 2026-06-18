'use client';
import { type FC } from 'react';

// types
import type { CountProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Count: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className
      )}
      data-slot="avatar-group-count"
      {...props}
    />
  );
};

export default Count;
