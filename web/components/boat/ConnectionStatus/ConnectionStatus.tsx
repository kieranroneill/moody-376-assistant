import { useT } from 'next-i18next/client';
import { type FC, useMemo } from 'react';

// enums
import { ConnectionStatusEnum } from '@/enums/api';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ConnectionStatus: FC<Props> = ({ className, status }) => {
  const { t } = useT();
  // memos
  const config = useMemo(
    () =>
      ({
        [ConnectionStatusEnum.Offline]: {
          background: 'bg-muted-foreground',
          label: t('boat:labels.connectionStatus', { context: ConnectionStatusEnum.Offline }),
        },
        [ConnectionStatusEnum.Online]: {
          background: 'bg-emerald-500',
          label: t('boat:labels.connectionStatus', { context: ConnectionStatusEnum.Online }),
        },
        [ConnectionStatusEnum.Syncing]: {
          background: 'bg-amber-500 animate-pulse',
          label: t('boat:labels.connectionStatus', { context: ConnectionStatusEnum.Syncing }),
        },
      })[status],
    [status, t]
  );

  return (
    <div className={cn('flex items-center gap-2 text-xs text-muted-foreground', className)}>
      <span className={cn('size-2 rounded-full', config.background)} aria-hidden="true" />

      <span>{config.label}</span>
    </div>
  );
};

export default ConnectionStatus;
