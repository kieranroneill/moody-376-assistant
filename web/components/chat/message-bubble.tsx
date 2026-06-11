import { Anchor, User } from 'lucide-react';

// components
import ActivityPill from '@/components/chat/ActivityPill';

// types
import type { ChatMessage } from '@/types/chat';

// utilities
import { formatTime } from '@/utilities/date';
import { cn } from '@/utilities/styles';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
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
          <time dateTime={message.timestamp}>{formatTime(message.timestamp)}</time>
        </div>

        {message.streaming && !message.content && message.activity ? (
          <ActivityPill activity={message.activity} />
        ) : (
          <div
            className={cn(
              'rounded-2xl px-4 py-3 text-sm leading-relaxed',
              isUser
                ? 'rounded-tr-sm bg-foreground text-background'
                : 'rounded-tl-sm border border-border bg-card text-card-foreground'
            )}
          >
            <p className="whitespace-pre-wrap text-pretty">
              {message.content}
              {message.streaming && (
                <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-current align-middle" />
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
