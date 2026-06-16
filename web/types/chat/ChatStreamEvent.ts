// types
import type ChatStreamActivityEvent from './ChatStreamActivityEvent';
import type ChatStreamDoneEvent from './ChatStreamDoneEvent';
import type ChatStreamErrorEvent from './ChatStreamErrorEvent';
import type ChatStreamTokenEvent from './ChatStreamTokenEvent';

type ChatStreamEvent = ChatStreamActivityEvent | ChatStreamDoneEvent | ChatStreamErrorEvent | ChatStreamTokenEvent;

export default ChatStreamEvent;
