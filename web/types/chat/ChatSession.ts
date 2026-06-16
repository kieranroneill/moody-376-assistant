// types
import type ChatMessage from './ChatMessage';
import type ChatSessionSummary from './ChatSessionSummary';

interface ChatSession extends ChatSessionSummary {
  messages: ChatMessage[];
}

export default ChatSession;
