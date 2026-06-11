import { useCallback, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

// enums
import { AssistantActivityEnum, ChatResponseTypeEnum, MessageRoleEnum } from '@/enums/chat';

// services
import APIService from '@/services/APIService';

// types
import type { UseChatSessionState } from './types';
import type { ChatMessage, ChatStreamResponse } from '@/types/chat';

export default function useChatSession(): UseChatSessionState {
  // refs
  const abortRef = useRef<AbortController | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);
  // states
  const [activity, setActivity] = useState<AssistantActivityEnum | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // callbacks
  const run = useCallback(async (history: ChatMessage[]) => {
    const assistantID = uuid();
    const controller = new AbortController();
    let apiService: APIService;
    let stream: AsyncGenerator<ChatStreamResponse>;

    setError(null);
    setIsStreaming(true);
    setActivity(AssistantActivityEnum.Thinking);
    setMessages((prev) => [
      ...prev,
      {
        id: assistantID,
        role: MessageRoleEnum.Assistant,
        content: '',
        timestamp: new Date().toISOString(),
        streaming: true,
      },
    ]);

    abortRef.current = controller;

    try {
      apiService = new APIService();
      stream = apiService.streamChat(
        {
          messages: history.map(({ content, role }) => ({
            role,
            content,
          })),
        },
        controller.signal
      );

      for await (const chunk of stream) {
        if (chunk.type === ChatResponseTypeEnum.Activity) {
          setActivity(chunk.activity);
          setMessages((prev) =>
            prev.map((message) => ({
              ...message,
              ...(message.id === assistantID && {
                activity: chunk.activity,
              }),
            }))
          );

          continue;
        }

        setMessages((prev) =>
          prev.map((message) => ({
            ...message,
            ...(message.id === assistantID && {
              content: message.content + chunk.text,
            }),
          }))
        );
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantID
            ? {
                ...message,
                streaming: false,
              }
            : message
        )
      );
    } catch (err) {
      console.log('[v0] chat stream error', err);

      setError("The assistant couldn't complete that request. Check your connection and try again.");
      setMessages((prev) => prev.filter((message) => message.id !== assistantID));
    } finally {
      setIsStreaming(false);
      setActivity(null);

      abortRef.current = null;
    }
  }, []);
  const send = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      let userMessage: ChatMessage;

      if (!trimmed || isStreaming) {
        return;
      }

      lastUserMessageRef.current = trimmed;

      userMessage = {
        content: trimmed,
        id: uuid(),
        role: MessageRoleEnum.User,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => {
        const next = [...prev, userMessage];

        void run(next);

        return next;
      });
    },
    [isStreaming, run]
  );
  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setActivity(null);
    setError(null);
    setIsStreaming(false);

    lastUserMessageRef.current = null;
  }, []);
  const retry = useCallback(() => {
    if (lastUserMessageRef.current) {
      setError(null);
      void run(messages);
    }
  }, [messages, run]);

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
