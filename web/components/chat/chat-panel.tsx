'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, PanelRight, RotateCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatEmptyState } from '@/components/chat/chat-empty-state';
import { Composer } from '@/components/chat/composer';
import { MessageBubble } from '@/components/chat/message-bubble';
import { QuickPrompts } from '@/components/chat/quick-prompts';

// hooks
import useChatSession from '@/hooks/useChatSession';

// types
import type { BoatSpecification } from '@/types/boat';

export interface ChatPanelHandle {
  send: (prompt: string) => void;
  reset: () => void;
}

export function ChatPanel({
  boat,
  onOpenContext,
  chat,
}: {
  boat?: BoatSpecification;
  onOpenContext?: () => void;
  chat: ReturnType<typeof useChatSession>;
}) {
  const { messages, isStreaming, error, send, retry } = chat;
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Mobile/tablet header with context trigger */}
      {onOpenContext && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{boat?.name ?? 'Onboard Assistant'}</p>
            <p className="truncate text-xs text-muted-foreground">
              {boat ? `${boat.make} ${boat.model}` : 'Connecting…'}
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
          {!hasMessages ? (
            <ChatEmptyState boat={boat} onSelect={send} />
          ) : (
            messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle />
              <AlertTitle>Request failed</AlertTitle>
              <AlertDescription>
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={retry} className="mt-2">
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
              <QuickPrompts onSelect={send} disabled={isStreaming} />
            </div>
          )}
          <Composer onSend={send} isStreaming={isStreaming} />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Assistant guidance is advisory. Verify against manuals and conditions before acting.
          </p>
        </div>
      </div>
    </div>
  );
}
