// types
import type { BoatDetails } from '@/types/boat';
import type { ChatMessage } from '@/types/chat';

interface Props {
  boatDetails: BoatDetails | null;
  error: string | null;
  isStreaming: boolean;
  messages: ChatMessage[];
  onOpenContext?: () => void;
  retryMessage: () => void;
  sendMessage: (content: string) => void;
}

export default Props;
