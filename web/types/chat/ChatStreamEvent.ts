// types
import type ChatStreamDoneEvent from './ChatStreamDoneEvent';
import type ChatStreamErrorEvent from './ChatStreamErrorEvent';
import type ChatStreamTokenEvent from './ChatStreamTokenEvent';

type ChatStreamEvent = ChatStreamDoneEvent | ChatStreamErrorEvent | ChatStreamTokenEvent;

export default ChatStreamEvent;
