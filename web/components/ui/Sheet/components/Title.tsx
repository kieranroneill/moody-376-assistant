'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { TitleProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Title: FC<Props> = ({ className, ...props }) => {
  return (
    <SheetPrimitive.Title
      className={cn('font-heading text-base font-medium text-foreground', className)}
      data-slot="sheet-title"
      {...props}
    />
  );
};

export default Title;
