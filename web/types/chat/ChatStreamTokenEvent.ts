// enums
import { ChatStreamEventTypeEnum } from '@/enums/chat';

// types
import type BaseChatStreamEvent from './BaseChatStreamEvent';

interface ChatStreamTokenEvent extends BaseChatStreamEvent {
  content: string;
  type: ChatStreamEventTypeEnum.Token;
}

export default ChatStreamTokenEvent;
