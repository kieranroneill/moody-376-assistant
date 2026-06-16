import { type FC, useMemo } from 'react';

// enums
import { MessageRoleEnum } from '@/enums/chat';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const MessagePill: FC<Props> = ({ message }) => {
  // memos
  const isUser = useMemo(() => message.role === MessageRoleEnum.User, [message]);

  return (
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
  );
};

export default MessagePill;
