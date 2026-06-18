'use client';

// components
import Count from './Count';

// types
import type { GroupComponent as Component, GroupProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Group: Component<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className
      )}
      data-slot="avatar-group"
      {...props}
    />
  );
};

Group.Count = Count;

export default Group;
