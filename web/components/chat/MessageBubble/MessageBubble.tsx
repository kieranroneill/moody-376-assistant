import { User, Anchor } from 'lucide-react';
import { type FC, useMemo } from 'react';

// enums
import { MessageRoleEnum } from '@/enums/chat';

// types
import type { Props } from './types';

// utilities
import { formatTime } from '@/utilities/date';
import { cn } from '@/utilities/styles';

const MessageBubble: FC<Props> = ({ children, role, timestamp }) => {
  // memos
  const isUser = useMemo(() => role === MessageRoleEnum.User, [role]);

  return (
    <div className={cn('flex w-full gap-3', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-full border',
          isUser ? 'border-border bg-muted text-muted-foreground' : 'border-foreground/10 bg-foreground text-background'
        )}
        aria-hidden="true"
      >
        {isUser ? <User className="size-4" /> : <Anchor className="size-4" />}
      </div>

      <div className={cn('flex min-w-0 max-w-[85%] flex-col gap-1.5', isUser && 'items-end')}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{isUser ? 'You' : 'Assistant'}</span>

          <time dateTime={timestamp}>{formatTime(timestamp)}</time>
        </div>

        {children}
      </div>
    </div>
  );
};

export default MessageBubble;
