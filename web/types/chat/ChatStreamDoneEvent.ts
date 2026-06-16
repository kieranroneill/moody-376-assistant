// enums
import { ChatStreamEventTypeEnum } from '@/enums/chat';

// types
import type BaseChatStreamEvent from './BaseChatStreamEvent';

interface ChatStreamDoneEvent extends BaseChatStreamEvent {
  type: ChatStreamEventTypeEnum.Done;
}

export default ChatStreamDoneEvent;
