import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { type FC } from 'react';

// components
import ScrollBar from '@/components/ui/ScrollBar';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ScrollArea: FC<Props> = ({ children, className, ...props }) => {
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative', className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBar />

      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

export default ScrollArea;
