'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { DescriptionProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Description: FC<Props> = ({ className, ...props }) => {
  return (
    <SheetPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      data-slot="sheet-description"
      {...props}
    />
  );
};

export default Description;
