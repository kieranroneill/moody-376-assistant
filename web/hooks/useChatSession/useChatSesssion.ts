import { useCallback, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

// enums
import { AssistantActivityEnum, ChatStreamEventTypeEnum, MessageRoleEnum } from '@/enums/chat';

// services
import APIService from '@/services/APIService';

// types
import type { UseChatSessionState } from './types';
import type { ChatMessage, ChatStreamEvent } from '@/types/chat';

export default function useChatSession(): UseChatSessionState {
  // refs
  const abortRef = useRef<AbortController | null>(null);
  const lastUserMessageIDRef = useRef<string | null>(null);
  // states
  const [activity, setActivity] = useState<AssistantActivityEnum | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // callbacks
  const run = useCallback(async (message: ChatMessage) => {
    const controller = new AbortController();
    const pendingContentByMessageId = new Map<string, string>();
    let apiService: APIService;
    let revealTimer: ReturnType<typeof setInterval> | null = null;
    let stream: AsyncGenerator<ChatStreamEvent>;

    const ensureRevealTimer = () => {
      if (revealTimer) {
        return;
      }

      revealTimer = setInterval(() => {
        const pendingEntries = Array.from(pendingContentByMessageId.entries())
          .map(([messageId, content]) => {
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
          if (revealTimer) {
            clearInterval(revealTimer);
            revealTimer = null;
          }

          return;
        }

        for (const { messageId, remainingContent } of pendingEntries) {
          if (remainingContent) {
            pendingContentByMessageId.set(messageId, remainingContent);
          } else {
            pendingContentByMessageId.delete(messageId);
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
      }, 16);
    };

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
          while (pendingContentByMessageId.size > 0) {
            await new Promise((resolve) => setTimeout(resolve, 16));
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

        pendingContentByMessageId.set(
          event.message_id,
          `${pendingContentByMessageId.get(event.message_id) ?? ''}${event.content}`
        );

        ensureRevealTimer();
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
  }, []);
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

        void run(newUserMessage);
      }
    }
  }, [messages, run]);
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

      void run(userMessage);
    },
    [isStreaming, run]
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
