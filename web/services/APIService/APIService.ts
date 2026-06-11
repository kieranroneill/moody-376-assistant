// enums
import { AssistantActivityEnum, ChatResponseTypeEnum } from '@/enums/chat';

// mock data
import { mockContext, mockSessionDetail, mockSessions } from './mock-data';

// types
import type { BoatContext } from '@/types/boat';
import type { ChatRequest, ChatSession, ChatSessionSummary, ChatStreamResponse } from '@/types/chat';

export default class APIService {
  /**
   * private methods
   */

  private _delay(ms: number): Promise<void> {
    return new Promise((value) => setTimeout(value, ms));
  }

  private async *_mockStream(req: ChatRequest) {
    const last = req.messages[req.messages.length - 1]?.content.toLowerCase() ?? '';
    let activity = AssistantActivityEnum.Thinking;
    let answer =
      "I'm your onboard assistant for the Wandering Albatross. I can help with maintenance, systems, power, weather, and your logbook. What would you like to look into?";
    let words: string[];

    if (last.includes('battery') || last.includes('power')) {
      activity = AssistantActivityEnum.PowerCheck;
      answer =
        'Battery bank is at 78% (12.7 V). Current house load is 6.4 A, with 3.2 A coming in from solar — net draw about 3.2 A. At this rate you have roughly 22 hours of reserve before reaching a 50% state of charge. The refrigeration compressor is your largest single consumer at 3.1 A.';
    }

    if (last.includes('weather')) {
      activity = AssistantActivityEnum.WeatherCheck;
      answer =
        'Right now: partly cloudy, SW wind 12 kts gusting 18, slight sea 0.5–1.0 m. Barometric pressure is 1014 hPa and falling (down 4 hPa over 3 hours), which suggests a front approaching. Keep an eye on the wind backing and building over the afternoon.';
    }

    if (last.includes('pump') || last.includes('troubleshoot')) {
      activity = AssistantActivityEnum.ManualLookup;
      answer =
        "For the freshwater pump: 1) Confirm the pump is getting 12 V at the terminals. 2) Check the tank isn't empty and the inlet strainer is clear. 3) Listen for the pump cycling — rapid cycling usually means air in the line or a leak. 4) Bleed the system by opening the highest tap until flow is steady. If it runs but no water reaches the taps, suspect a blocked filter or a failed pump diaphragm.";
    }

    if (last.includes('log') || last.includes('departure')) {
      activity = AssistantActivityEnum.ReviewLog;
      answer =
        'I\'ve drafted a log entry: "Departure from harbour — lines slipped, engine started, all systems nominal." Set the timestamp to now and I\'ll save it to the logbook. Would you like to add weather or crew notes?';
    }

    if (last.includes('checklist') || last.includes('maintenance') || last.includes('engine')) {
      activity = AssistantActivityEnum.SystemCheck;
      answer =
        "Engine maintenance checklist: check oil level and condition, inspect coolant and raw-water flow, confirm the impeller is within service life (yours is currently overdue), check belt tension, inspect the fuel pre-filter for water, and verify the exhaust elbow. I can open the full manual section if you'd like step-by-step guidance.";
    }

    yield {
      type: ChatResponseTypeEnum.Activity as const,
      activity,
    };

    await this._delay(700);

    words = answer.split(' ');

    for (let i = 0; i < words.length; i++) {
      await this._delay(28);

      yield {
        type: ChatResponseTypeEnum.Text as const,
        text: (i === 0 ? '' : ' ') + words[i],
      };
    }
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

  public getContext(): Promise<BoatContext> {
    return this._safeFetch<BoatContext>('/api/context', mockContext, {
      cache: 'no-store',
    });
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

  public async *streamChat(request: ChatRequest, signal?: AbortSignal): AsyncGenerator<ChatStreamResponse> {
    let buffer: string;
    let decoder: TextDecoder;
    let reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>;
    let response: Response;

    try {
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal,
      });
    } catch (err) {
      console.log('[v0] streamChat fetch failed, using mock stream', err);

      yield* this._mockStream(request);

      return;
    }

    if (!response.ok || !response.body) {
      console.log('[v0] streamChat bad response, using mock stream', response?.status);

      yield* this._mockStream(request);

      return;
    }

    reader = response.body.getReader();
    decoder = new TextDecoder();
    buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      let lines: string[];

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        if (line.startsWith('activity:')) {
          yield {
            activity: line.slice('activity:'.length).trim(),
            type: ChatResponseTypeEnum.Activity,
          } as ChatStreamResponse<ChatResponseTypeEnum.Activity>;

          continue;
        }

        yield {
          text: line,
          type: ChatResponseTypeEnum.Text,
        } as ChatStreamResponse<ChatResponseTypeEnum.Text>;
      }
    }

    if (buffer.trim()) {
      yield {
        text: buffer,
        type: ChatResponseTypeEnum.Text,
      } as ChatStreamResponse<ChatResponseTypeEnum.Text>;
    }
  }
}
