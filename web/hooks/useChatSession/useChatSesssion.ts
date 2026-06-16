import { useCallback, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

// enums
import { AssistantActivityEnum, ChatStreamEventTypeEnum, MessageRoleEnum } from '@/enums/chat';

// services
import APIService from '@/services/APIService';

// types
import type { PendingContentEntry, UseChatSessionState } from './types';
import type { ChatMessage, ChatStreamEvent } from '@/types/chat';

export default function useChatSession(): UseChatSessionState {
  // refs
  const abortRef = useRef<AbortController | null>(null);
  const lastUserMessageIDRef = useRef<string | null>(null);
  // memos
  const revealContentIntervalMS = useMemo(() => 16, []);
  // states
  const [activity, setActivity] = useState<AssistantActivityEnum | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // callbacks
  const _revealPendingContent = useCallback((pendingContentMap: Map<string, string>, onEmpty: () => void) => {
    const pendingEntries = Array.from(pendingContentMap.entries())
      .map<PendingContentEntry>(([messageId, content]) => {
        const visibleContent = content.slice(0, 2);
        const remainingContent = content.slice(2);

        return {
          messageId,
          remainingContent,
          visibleContent,
        };
      })
      .filter(({ visibleContent }) => visibleContent.length > 0);

    if (pendingEntries.length === 0) {
      onEmpty();

      return;
    }

    for (const { messageId, remainingContent } of pendingEntries) {
      if (remainingContent) {
        pendingContentMap.set(messageId, remainingContent);
      } else {
        pendingContentMap.delete(messageId);
      }
    }

    setMessages((previousMessages) =>
      previousMessages.map((message) => {
        const pendingEntry = pendingEntries.find(({ messageId }) => messageId === message.id);

        if (!pendingEntry) {
          return message;
        }

        return {
          ...message,
          content: message.content + pendingEntry.visibleContent,
        };
      })
    );
  }, []);
  const _run = useCallback(
    async (message: ChatMessage) => {
      const controller = new AbortController();
      const pendingContentMap = new Map<string, string>();
      let apiService: APIService;
      let revealTimer: ReturnType<typeof setInterval> | null = null;
      let stream: AsyncGenerator<ChatStreamEvent>;

      setError(null);
      setIsStreaming(true);
      setActivity(AssistantActivityEnum.Thinking);

      abortRef.current = controller;

      try {
        apiService = new APIService();
        stream = apiService.streamChat(
          {
            content: message.content,
          },
          controller.signal
        );

        for await (const event of stream) {
          if (event.type === ChatStreamEventTypeEnum.Error) {
            console.error('chat stream error:', event.error);

            setMessages((prev) => prev.filter((message) => message.id !== event.message_id));

            throw new Error(event.error.message);
          }

          if (event.type === ChatStreamEventTypeEnum.Done) {
            while (pendingContentMap.size > 0) {
              await _wait();
            }

            setMessages((previousMessages) =>
              previousMessages.map((message) =>
                message.id === event.message_id
                  ? {
                      ...message,
                      streaming: false,
                      timestamp: new Date().toISOString(),
                    }
                  : message
              )
            );

            break;
          }

          setActivity(null);

          setMessages((previousMessages) => {
            const previousMessage = previousMessages.find(({ id }) => id === event.message_id);

            if (previousMessage) {
              return previousMessages;
            }

            return [
              ...previousMessages,
              {
                content: '',
                id: event.message_id,
                role: MessageRoleEnum.Assistant,
                streaming: true,
                timestamp: new Date().toISOString(),
              },
            ];
          });

          pendingContentMap.set(event.message_id, `${pendingContentMap.get(event.message_id) ?? ''}${event.content}`);

          if (!revealTimer) {
            revealTimer = setInterval(() => {
              _revealPendingContent(pendingContentMap, () => {
                if (revealTimer) {
                  clearInterval(revealTimer);

                  revealTimer = null;
                }
              });
            }, revealContentIntervalMS);
          }
        }
      } catch (error) {
        setError("The assistant couldn't complete that request. Check your connection and try again.");
      } finally {
        if (revealTimer) {
          clearInterval(revealTimer);

          revealTimer = null;
        }

        setIsStreaming(false);
        setActivity(null);

        abortRef.current = null;
      }
    },
    [_revealPendingContent]
  );
  const _wait = useCallback(
    () => new Promise((resolve) => setTimeout(resolve, revealContentIntervalMS)),
    [revealContentIntervalMS]
  );
  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setActivity(null);
    setError(null);
    setIsStreaming(false);

    lastUserMessageIDRef.current = null;
  }, []);
  const retry = useCallback(() => {
    let lastUserMessage: ChatMessage | null;
    let newUserMessage: ChatMessage;

    if (lastUserMessageIDRef.current) {
      lastUserMessage = messages.find((message) => message.id === lastUserMessageIDRef.current) || null;

      if (lastUserMessage) {
        newUserMessage = {
          content: lastUserMessage.content,
          id: uuid(),
          role: MessageRoleEnum.User,
          timestamp: new Date().toISOString(),
        };
        lastUserMessageIDRef.current = newUserMessage.id;

        setError(null);
        setMessages((prev) => [...prev, newUserMessage]);

        void _run(newUserMessage);
      }
    }
  }, [messages, _run]);
  const send = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      let userMessage: ChatMessage;

      if (!trimmed || isStreaming) {
        return;
      }

      userMessage = {
        content: trimmed,
        id: uuid(),
        role: MessageRoleEnum.User,
        timestamp: new Date().toISOString(),
      };
      lastUserMessageIDRef.current = userMessage.id;

      setMessages((prev) => [...prev, userMessage]);

      void _run(userMessage);
    },
    [isStreaming, _run]
  );

  return {
    activity,
    error,
    isStreaming,
    messages,
    reset,
    retry,
    send,
  };
}
