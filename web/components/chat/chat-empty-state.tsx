import { Anchor } from 'lucide-react';

// components
import { QuickPrompts } from '@/components/chat/quick-prompts';

// types
import type { BoatDetails } from '@/types/boat';

const SUGGESTIONS = [
  'How do I troubleshoot the freshwater pump?',
  'What is drawing power right now?',
  "Summarize today's battery usage",
  'What weather should I pay attention to today?',
  'Create a log entry for departure from harbor',
  'Find the maintenance checklist for the engine',
];

export function ChatEmptyState({ boat, onSelect }: { boat?: BoatDetails; onSelect: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground text-background">
          <Anchor className="size-6" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-balance text-xl font-semibold tracking-tight">
            Onboard assistant for {boat?.name ?? 'your boat'}
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Ask about maintenance, systems, power, weather, or your logbook.
            {boat ? ` ${boat.make} ${boat.model}.` : ''} I know this boat.
          </p>
        </div>
      </div>

      <ul className="grid w-full gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => onSelect(s)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left text-sm leading-relaxed text-card-foreground transition-colors hover:border-foreground/30 hover:bg-accent"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Quick tasks</span>
        <QuickPrompts onSelect={onSelect} />
      </div>
    </div>
  );
}
