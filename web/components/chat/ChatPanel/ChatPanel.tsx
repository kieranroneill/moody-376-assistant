'use client';

import { AlertTriangle, PanelRight, RotateCw } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC, useEffect, useMemo, useRef } from 'react';

// components
import ActivityPill from '@/components/chat/ActivityPill';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import ChatEmptyState from '@/components/chat/ChatEmptyState';
import Composer from '@/components/chat/Composer';
import MessageBubble from '@/components/chat/MessageBubble';
import MessagePill from '@/components/chat/MessagePill';
import QuickPrompts from '@/components/chat/QuickPrompts';
import ThinkingPill from '@/components/chat/ThinkingPill';
import ScrollArea from '@/components/ui/ScrollArea';

// enums
import { MessageRoleEnum } from '@/enums';

// types
import type { Props } from './types';

const ChatPanel: FC<Props> = ({
  activity,
  boat,
  error,
  isStreaming,
  messages,
  onOpenContext,
  retryMessage,
  sendMessage,
}) => {
  const { t } = useT();
  // refs
  const scrollRef = useRef<HTMLDivElement>(null);
  // memos
  const hasMessages = useMemo(() => messages.length > 0, [messages]);
  const hasStreamingAssistantMessage = useMemo(
    () => messages.some((message) => message.role === MessageRoleEnum.Assistant && message.streaming),
    [messages]
  );
  const showThinking = useMemo(
    () => isStreaming && !activity && !hasStreamingAssistantMessage,
    [activity, hasStreamingAssistantMessage, isStreaming]
  );

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
            <p className="truncate text-sm font-semibold">{boat?.profile.name ?? t('common:titles.app')}</p>

            <p className="truncate text-xs text-muted-foreground">
              {boat ? `${boat.specification.make} ${boat.specification.model}` : t('common:captions.connecting')}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={onOpenContext}>
            <PanelRight data-icon="inline-start" />

            {t('common:labels.context')}
          </Button>
        </div>
      )}

      <ScrollArea className="min-h-0 flex-1">
        <div ref={scrollRef} className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
          {!hasMessages && !activity && <ChatEmptyState boat={boat} onSelect={sendMessage} />}

          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} timestamp={message.timestamp}>
              <MessagePill message={message} />
            </MessageBubble>
          ))}

          {activity && (
            <MessageBubble role={MessageRoleEnum.Assistant}>
              <ActivityPill activity={activity} />
            </MessageBubble>
          )}

          {showThinking && (
            <MessageBubble role={MessageRoleEnum.Assistant}>
              <ThinkingPill />
            </MessageBubble>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle />
              <Alert.Title>Request failed</Alert.Title>
              <Alert.Description>
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={retryMessage} className="mt-2">
                  <RotateCw data-icon="inline-start" />

                  {t('common:labels.retry')}
                </Button>
              </Alert.Description>
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

          <p className="mt-2 text-center text-xs text-muted-foreground">{t('chat:captions.advisoryWarning')}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
