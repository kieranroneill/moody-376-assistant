import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { FC } from 'react';

// types
import type { Props } from './types';

// utilities
import { createBadgeVariants } from './utilities';
import { cn } from '@/utilities/styles';

const Badge: FC<Props> = ({ className, variant = 'default', render, ...props }) => {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(createBadgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
};

export default Badge;
