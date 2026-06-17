import { type FC } from 'react';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const Skeleton: FC<Props> = ({ className, ...props }) => {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} data-slot="skeleton" {...props} />;
};

export default Skeleton;
