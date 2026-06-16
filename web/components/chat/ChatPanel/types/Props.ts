// enums
import { AssistantActivityEnum } from '@/enums/chat';

// types
import type { BoatSpecification } from '@/types/boat';
import type { ChatMessage } from '@/types/chat';

interface Props {
  activity: AssistantActivityEnum | null;
  boatDetails: BoatSpecification | null;
  error: string | null;
  isStreaming: boolean;
  messages: ChatMessage[];
  onOpenContext?: () => void;
  retryMessage: () => void;
  sendMessage: (content: string) => void;
}

export default Props;
