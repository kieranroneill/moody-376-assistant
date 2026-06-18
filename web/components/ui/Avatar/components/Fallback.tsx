'use client';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { type FC } from 'react';

// types
import type { FallbackProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Fallback: FC<Props> = ({ className, ...props }) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
        className
      )}
      {...props}
    />
  );
};

export default Fallback;
