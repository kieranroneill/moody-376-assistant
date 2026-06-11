// types
import type { ChatSessionSummary } from '@/types/chat';

interface UseChatSessionsState {
  fetch: () => Promise<void>;
  loading: boolean;
  sessions: ChatSessionSummary[];
}

export default UseChatSessionsState;
