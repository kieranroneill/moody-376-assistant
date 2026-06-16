// enums
import { AssistantActivityEnum } from '@/enums/chat';

interface ActivityMessage {
  activity: AssistantActivityEnum;
  content: string;
  id: string;
}

export default ActivityMessage;
