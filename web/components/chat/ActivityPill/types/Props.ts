// enums
import { AssistantActivityEnum } from '@/enums/chat';

// types
import type { BasicComponentProps } from '@/types/ui';

interface Props extends BasicComponentProps {
  activity: AssistantActivityEnum;
}

export default Props;
