'use client';

import { AlertTriangle, PanelRight, RotateCw } from 'lucide-react';
import { type FC, useEffect, useMemo, useRef } from 'react';

// components
import ActivityPill from '@/components/chat/ActivityPill';
import MessageBubble from '@/components/chat/MessageBubble';
import MessagePill from '@/components/chat/MessagePill';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatEmptyState } from '@/components/chat/chat-empty-state';
import { Composer } from '@/components/chat/composer';
import { QuickPrompts } from '@/components/chat/quick-prompts';

// enums
import { MessageRoleEnum } from '@/enums';

// types
import type { Props } from './types';

const ChatPanel: FC<Props> = ({
  activity,
  boatDetails,
  error,
  isStreaming,
  messages,
  onOpenContext,
  retryMessage,
  sendMessage,
}) => {
  // refs
  const scrollRef = useRef<HTMLDivElement>(null);
  // memos
  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  useEffect(() => {
    const element = scrollRef.current;

    if (element) {
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
    }
  }, [activity, messages]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Mobile/tablet header with context trigger */}
      {onOpenContext && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{boatDetails?.name ?? 'Onboard Assistant'}</p>

            <p className="truncate text-xs text-muted-foreground">
              {boatDetails ? `${boatDetails.make} ${boatDetails.model}` : 'Connecting…'}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={onOpenContext}>
            <PanelRight data-icon="inline-start" />
            Context
          </Button>
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1">
        <div ref={scrollRef} className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
          {!hasMessages && !activity && <ChatEmptyState boat={boatDetails} onSelect={sendMessage} />}

          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} timestamp={message.timestamp}>
              <MessagePill message={message} />
            </MessageBubble>
          ))}

          {activity && (
            <MessageBubble role={MessageRoleEnum.Assistant} timestamp={new Date().toISOString()}>
              <ActivityPill activity={activity} />
            </MessageBubble>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle />
              <AlertTitle>Request failed</AlertTitle>
              <AlertDescription>
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={retryMessage} className="mt-2">
                  <RotateCw data-icon="inline-start" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl px-4 py-3">
          {hasMessages && (
            <div className="mb-3 -mx-1 overflow-x-auto px-1 pb-1">
              <QuickPrompts onSelect={sendMessage} disabled={isStreaming} />
            </div>
          )}

          <Composer onSend={sendMessage} isStreaming={isStreaming} />

          <p className="mt-2 text-center text-xs text-muted-foreground">
            Assistant guidance is advisory. Verify against manuals and conditions before acting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
