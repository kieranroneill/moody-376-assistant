// types
import type ChatMessage from './ChatMessage';

interface ChatResponse {
  messages: ChatMessage[];
  sessionId: string;
}

export default ChatResponse;
