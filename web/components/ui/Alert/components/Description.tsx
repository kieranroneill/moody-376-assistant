import { type FC } from 'react';

// types
import type { DescriptionProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Description: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className
      )}
      data-slot="alert-description"
      {...props}
    />
  );
};

export default Description;
