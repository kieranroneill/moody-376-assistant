'use client';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';
import { type FC } from 'react';

// types
import type { ImageProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Image: FC<Props> = ({ className, ...props }) => {
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square size-full rounded-full object-cover', className)}
      data-slot="avatar-image"
      {...props}
    />
  );
};

export default Image;
