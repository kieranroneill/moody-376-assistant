import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { type FC } from 'react';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ScrollBar: FC<Props> = ({ className, orientation = 'vertical', ...props }) => {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className
      )}
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" data-slot="scroll-area-thumb" />
    </ScrollAreaPrimitive.Scrollbar>
  );
};

export default ScrollBar;
