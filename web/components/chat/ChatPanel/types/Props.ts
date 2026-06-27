// types
import type { BoatContext } from '@/types/boat';
import type { ActivityMessage, ChatMessage } from '@/types/chat';

interface Props {
  activity?: ActivityMessage;
  boat?: BoatContext;
  error?: string;
  isStreaming: boolean;
  messages: ChatMessage[];
  onOpenContext?: () => void;
  retryMessage: () => void;
  sendMessage: (content: string) => void;
}

export default Props;
