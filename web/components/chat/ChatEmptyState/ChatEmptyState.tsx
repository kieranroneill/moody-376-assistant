import { Anchor } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC, useMemo } from 'react';

// components
import QuickPrompts from '@/components/chat/QuickPrompts';

// types
import type { Props } from './types';

const ChatEmptyState: FC<Props> = ({ boat, onSelect }) => {
  const { t } = useT();
  // memos
  const suggestedPrompts = useMemo(() => t('chat:captions.suggestedPrompts', { returnObjects: true }) as string[], [t]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground text-background">
          <Anchor className="size-6" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-balance text-xl font-semibold tracking-tight">
            {t('chat:captions.welcome', { boat: boat?.name ?? 'your boat' })}
          </h2>

          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {t('chat:captions.welcomeHint', { boat: boat ? ` ${boat.make} ${boat.model}.` : '' })}
          </p>
        </div>
      </div>

      <ul className="grid w-full gap-2 sm:grid-cols-2">
        {suggestedPrompts.map((prompt) => (
          <li key={prompt}>
            <button
              type="button"
              onClick={() => onSelect(prompt)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left text-sm leading-relaxed text-card-foreground transition-colors hover:border-foreground/30 hover:bg-accent"
            >
              {prompt}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t('chat:labels.quickTasks')}
        </span>

        <QuickPrompts onSelect={onSelect} />
      </div>
    </div>
  );
};

export default ChatEmptyState;
