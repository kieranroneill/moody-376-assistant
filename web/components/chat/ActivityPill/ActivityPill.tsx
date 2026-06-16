import { BookOpen, BatteryCharging, ClipboardList, Cpu, CloudSun, type LucideProps } from 'lucide-react';
import { type FC, type ForwardRefExoticComponent, type RefAttributes, useMemo } from 'react';

// enums
import { AssistantActivityEnum } from '@/enums/chat';

// types
import type { Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ActivityPill: FC<Props> = ({ activity, className }) => {
  // memos
  const Icon = useMemo<ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>>(
    () =>
      ({
        [AssistantActivityEnum.ManualLookup]: BookOpen,
        [AssistantActivityEnum.PowerCheck]: BatteryCharging,
        [AssistantActivityEnum.ReviewLog]: ClipboardList,
        [AssistantActivityEnum.SystemCheck]: Cpu,
        [AssistantActivityEnum.WeatherCheck]: CloudSun,
      })[activity.activity],
    [activity]
  );

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground',
        className
      )}
    >
      <Icon className="size-3.5 animate-pulse" aria-hidden="true" />

      {activity.content}

      <span className="sr-only">in progress</span>
    </span>
  );
};

export default ActivityPill;
