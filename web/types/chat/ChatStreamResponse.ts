// enums
import { AssistantActivityEnum, ChatResponseTypeEnum } from '@/enums/chat';

type ChatStreamResponse<Type extends ChatResponseTypeEnum = ChatResponseTypeEnum> =
  Type extends ChatResponseTypeEnum.Activity
    ? {
        type: ChatResponseTypeEnum.Activity;
        activity: AssistantActivityEnum;
      }
    : {
        type: ChatResponseTypeEnum.Text;
        text: string;
      };

export default ChatStreamResponse;
