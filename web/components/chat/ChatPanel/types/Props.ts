// types
import type { BoatSpecification } from '@/types/boat';
import type { ChatMessage } from '@/types/chat';

interface Props {
  boatDetails: BoatSpecification | null;
  error: string | null;
  isStreaming: boolean;
  messages: ChatMessage[];
  onOpenContext?: () => void;
  retryMessage: () => void;
  sendMessage: (content: string) => void;
}

export default Props;
