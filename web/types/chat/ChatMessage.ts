// enums
import { AssistantActivityEnum, MessageRoleEnum } from '@/enums/chat';

interface ChatMessage {
  activity?: AssistantActivityEnum;
  content: string;
  id: string;
  role: MessageRoleEnum;
  streaming?: boolean;
  timestamp: string;
}

export default ChatMessage;
