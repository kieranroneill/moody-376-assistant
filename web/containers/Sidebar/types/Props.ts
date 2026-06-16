// enums
import { ConnectionStatusEnum } from '@/enums/api';

// types
import type { BoatSpecification } from '@/types/boat';
import type { ChatSessionSummary } from '@/types/chat';

interface Props {
  activeNavigation?: string;
  boatDetails?: BoatSpecification;
  connection: ConnectionStatusEnum;
  loading: boolean;
  onNewChat: () => void;
  onNavigate?: (key: string) => void;
  sessions: ChatSessionSummary[];
}

export default Props;
