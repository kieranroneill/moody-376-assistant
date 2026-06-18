'use client';
import { type FC } from 'react';

// types
import type { BadgeProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Badge: FC<Props> = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className
      )}
      data-slot="avatar-badge"
      {...props}
    />
  );
};

export default Badge;
