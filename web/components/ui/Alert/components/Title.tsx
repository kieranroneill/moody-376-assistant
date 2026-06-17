import { type FC } from 'react';

// types
import type { TitleProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Title: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
        className
      )}
      data-slot="alert-title"
      {...props}
    />
  );
};

export default Title;
