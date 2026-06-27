import { Wrench } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC, useMemo } from 'react';

// components
import Badge from '@/components/ui/Badge';
import ContextCard from '@/components/context/ContextCard';

// enums
import { MaintenanceStatusEnum } from '@/enums/boat';

// types
import type { BadgeConfig, Props } from './types';

const MaintenanceContextCard: FC<Props> = ({ items }) => {
  const { t } = useT();
  // memos
  const badgeConfigs = useMemo<Record<MaintenanceStatusEnum, BadgeConfig>>(
    () => ({
      [MaintenanceStatusEnum.Due]: {
        label: 'Due',
        variant: 'outline',
      },
      [MaintenanceStatusEnum.OK]: {
        label: 'OK',
        variant: 'secondary',
      },
      [MaintenanceStatusEnum.Overdue]: {
        label: 'Overdue',
        variant: 'destructive',
      },
    }),
    []
  );

  return (
    <ContextCard title={t('boat:titles.maintenance')} icon={<Wrench className="size-4" />}>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug">{item.title}</p>

              <p className="text-xs text-muted-foreground">
                {item.system} · {item.dueLabel}
              </p>
            </div>

            <Badge variant={badgeConfigs[item.status].variant} className="shrink-0">
              {badgeConfigs[item.status].label}
            </Badge>
          </li>
        ))}
      </ul>
    </ContextCard>
  );
};

export default MaintenanceContextCard;
