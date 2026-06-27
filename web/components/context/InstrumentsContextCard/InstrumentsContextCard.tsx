import { Gauge } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC } from 'react';

// components
import ContextCard from '@/components/context/ContextCard';

// types
import type { Props } from './types';

const InstrumentsContextCard: FC<Props> = ({ items }) => {
  const { t } = useT();

  return (
    <ContextCard title={t('boat:titles.instruments')} icon={<Gauge className="size-4" />}>
      <dl className="grid grid-cols-3 gap-3">
        {items.map((instrument) => (
          <div key={instrument.id} className="rounded-md border border-border bg-muted/40 px-2.5 py-2">
            <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{instrument.label}</dt>

            <dd className="mt-0.5 text-sm font-semibold tabular-nums">
              {instrument.value}

              {instrument.unit && (
                <span className="ml-0.5 text-xs font-normal text-muted-foreground">{instrument.unit}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </ContextCard>
  );
};

export default InstrumentsContextCard;
