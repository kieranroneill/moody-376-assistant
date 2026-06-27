// types
import type { BoatContext } from '@/types/boat';
import type { ChatSessionSummary } from '@/types/chat';

interface Props {
  activeNavigation?: string;
  boat?: BoatContext;
  loading: boolean;
  onNewChat: () => void;
  onNavigate?: (key: string) => void;
  sessions: ChatSessionSummary[];
}

export default Props;
