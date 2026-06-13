// enums
import { ChatStreamEventTypeEnum } from '@/enums/chat';

// types
import type BaseChatStreamEvent from './BaseChatStreamEvent';
import type { BaseErrorResponse } from '@/types/errors';

interface ChatStreamErrorEvent extends BaseChatStreamEvent {
  error: BaseErrorResponse;
  type: ChatStreamEventTypeEnum.Error;
}

export default ChatStreamErrorEvent;
