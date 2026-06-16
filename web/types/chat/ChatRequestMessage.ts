// enums
import { MessageRoleEnum } from '@/enums/chat';

interface ChatRequestMessage {
  content: string;
  role: MessageRoleEnum;
}

export default ChatRequestMessage;
