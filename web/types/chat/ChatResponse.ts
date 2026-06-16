// types
import type ChatMessage from './ChatMessage';

interface ChatResponse {
  messages: ChatMessage[];
  session_id: string;
}

export default ChatResponse;
