// enums
import { AssistantActivityEnum } from '@/enums/chat';

// types
import type { ChatMessage } from '@/types/chat';

interface UseChatSessionState {
  activity: AssistantActivityEnum | null;
  error: string | null;
  isStreaming: boolean;
  messages: ChatMessage[];
  reset: () => void;
  retry: () => void;
  send: (content: string) => void;
}

export default UseChatSessionState;
