'use client';
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar';

// components
import Badge from './components/Badge';
import Fallback from './components/Fallback';
import Image from './components/Image';
import Group from './components/Group';

// types
import type { Component, Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const Avatar: Component<Props> = ({ className, size = 'default', ...props }) => {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten',
        className
      )}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
};

Avatar.Badge = Badge;
Avatar.Fallback = Fallback;
Avatar.Group = Group;
Avatar.Image = Image;

export default Avatar;
