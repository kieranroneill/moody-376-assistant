// types
import type { ActivityMessage, ChatMessage } from '@/types/chat';

interface UseChatSessionState {
  activity: ActivityMessage | null;
  error: string | null;
  isStreaming: boolean;
  messages: ChatMessage[];
  reset: () => void;
  retry: () => void;
  send: (content: string) => void;
}

export default UseChatSessionState;
