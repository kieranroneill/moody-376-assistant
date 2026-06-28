// enums
import { RouteEnum } from '@/enums/api';

// mock data
import { mockSessionDetail, mockSessions } from './mock-data';

// types
import type { BoatContext } from '@/types/boat';
import type { ChatRequest, ChatSession, ChatSessionSummary, ChatStreamEvent } from '@/types/chat';

export default class APIService {
  /**
   * private methods
   */

  private _parseChatStreamEvent(rawEvent: string): ChatStreamEvent | null {
    const data = rawEvent
      .split('\n')
      .map((line) => line.trimEnd())
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice('data:'.length).trimStart())
      .join('\n');

    if (!data) {
      return null;
    }

    return JSON.parse(data) as ChatStreamEvent;
  }

  private async _safeFetch<T>(url: string, fallback: T, init?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, init);

      if (!response.ok) {
        throw new Error(`request failed: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (err) {
      console.log('api fallback for', url, err instanceof Error ? err.message : err);

      return fallback;
    }
  }

  /**
   * public methods
   */

  public async getBoat(profileID: string, signal?: AbortSignal): Promise<BoatContext> {
    let response: Response;

    try {
      response = await fetch(`${RouteEnum.Base}${RouteEnum.Boat}/${profileID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        signal,
      });

      if (!response.ok || !response.body) {
        console.error(`failed to get response: ${response.status}`, response.body);

        throw new Error('bad response');
      }

      return (await response.json()) as Promise<BoatContext>;
    } catch (error) {
      // TODO: handle unauthorized events and when the response is bad
      console.log(error);

      throw error;
    }
  }

  public async getSession(id: string): Promise<ChatSession> {
    return this._safeFetch<ChatSession>(`/api/sessions/${id}`, mockSessionDetail(id), {
      cache: 'no-store',
    });
  }

  public async getSessions(): Promise<ChatSessionSummary[]> {
    return this._safeFetch<ChatSessionSummary[]>('/api/sessions', mockSessions, {
      cache: 'no-store',
    });
  }

  public async *streamChat(request: ChatRequest, signal?: AbortSignal): AsyncGenerator<ChatStreamEvent> {
    let buffer: string;
    let decoder: TextDecoder;
    let reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>;
    let response: Response;

    try {
      response = await fetch(`${RouteEnum.Base}${RouteEnum.Chat}${RouteEnum.Stream}`, {
        body: JSON.stringify(request),
        headers: {
          Accept: 'text/event-stream',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }

    if (!response.ok || !response.body) {
      console.error(`failed to get response: ${response.status}`, response.body);

      throw new Error('bad response');
    }

    reader = response.body.getReader();
    decoder = new TextDecoder();
    buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      let rawEvents: string[];

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      rawEvents = buffer.split('\n\n');
      buffer = rawEvents.pop() ?? '';

      for (const rawEvent of rawEvents) {
        const event = this._parseChatStreamEvent(rawEvent);

        if (event) {
          yield event;
        }
      }
    }

    buffer += decoder.decode();

    if (buffer.trim()) {
      const event = this._parseChatStreamEvent(buffer);

      if (event) {
        yield event;
      }
    }
  }
}
