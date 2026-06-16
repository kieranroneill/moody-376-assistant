// enums
import { AssistantActivityEnum, ChatStreamEventTypeEnum } from '@/enums/chat';

// types
import type BaseChatStreamEvent from './BaseChatStreamEvent';

interface ChatStreamActivityEvent extends BaseChatStreamEvent {
  activity: AssistantActivityEnum;
  content: string;
  type: ChatStreamEventTypeEnum.Activity;
}

export default ChatStreamActivityEvent;
