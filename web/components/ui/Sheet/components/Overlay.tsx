'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { OverlayProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Overlay: FC<Props> = ({ className, ...props }) => {
  return (
    <SheetPrimitive.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs',
        className
      )}
      data-slot="sheet-overlay"
      {...props}
    />
  );
};

export default Overlay;
