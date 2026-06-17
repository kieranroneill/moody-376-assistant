import { type FC } from 'react';

// types
import type { ActionProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Action: FC<Props> = ({ className, ...props }) => {
  return <div className={cn('absolute top-2 right-2', className)} data-slot="alert-action" {...props} />;
};

export default Action;
