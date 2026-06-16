import { Loader } from 'lucide-react';
import { type FC } from 'react';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ThinkingPill: FC<Props> = ({ className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground',
      className
    )}
  >
    <Loader className="size-3.5 animate-spin" aria-hidden="true" />
    Thinking...
    <span className="sr-only">Thinking</span>
  </span>
);

export default ThinkingPill;
