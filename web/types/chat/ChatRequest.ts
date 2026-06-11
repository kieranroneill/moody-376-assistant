// types
import type ChatRequestMessage from './ChatRequestMessage';

interface ChatRequest {
  sessionID?: string;
  messages: ChatRequestMessage[];
}

export default ChatRequest;
