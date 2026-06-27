import { NotebookPen } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC } from 'react';

// components
import ContextCard from '@/components/context/ContextCard';

// types
import type { Props } from './types';

// utilities
import { formatRelativeTime } from '@/utilities/date';

const LogbookContextCard: FC<Props> = ({ items }) => {
  const { t } = useT();

  return (
    <ContextCard title={t('boat:titles.logbook')} icon={<NotebookPen className="size-4" />}>
      <ul className="flex flex-col gap-3">
        {items.map((entry) => (
          <li key={entry.id} className="border-l-2 border-border pl-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium leading-snug">{entry.title}</p>
              <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(entry.timestamp)}</span>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{entry.body}</p>
          </li>
        ))}
      </ul>
    </ContextCard>
  );
};

export default LogbookContextCard;
