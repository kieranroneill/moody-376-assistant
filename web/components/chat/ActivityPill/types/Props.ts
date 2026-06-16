// types
import type { ActivityMessage } from '@/types/chat';
import type { BasicComponentProps } from '@/types/ui';

interface Props extends BasicComponentProps {
  activity: ActivityMessage;
}

export default Props;
