'use client';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';

// components
import Indicator from './components/Indicator';
import Label from './components/Label';
import Track from './components/Track';
import Value from './components/Value';

// types
import type { Component, Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const Progress: Component<Props> = ({ className, children, ...props }) => {
  return (
    <ProgressPrimitive.Root className={cn('flex flex-wrap gap-3', className)} data-slot="progress" {...props}>
      {children}

      <Track>
        <Indicator />
      </Track>
    </ProgressPrimitive.Root>
  );
};

Progress.Indicator = Indicator;
Progress.Label = Label;
Progress.Track = Track;
Progress.Value = Value;

export default Progress;
