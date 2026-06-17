'use client';

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';
import { type FC } from 'react';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const Separator: FC<Props> = ({ className, orientation = 'horizontal', ...props }) => {
  return (
    <SeparatorPrimitive
      className={cn(
        'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
        className
      )}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  );
};

export default Separator;
