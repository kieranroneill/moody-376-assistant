// enums
import { MessageRoleEnum } from '@/enums/chat';

interface ChatMessage {
  content: string;
  id: string;
  role: MessageRoleEnum;
  streaming?: boolean;
  timestamp: string;
}

export default ChatMessage;
