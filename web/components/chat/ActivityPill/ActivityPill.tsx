import { BookOpen, BatteryCharging, ClipboardList, Cpu, CloudSun, Loader } from 'lucide-react';
import { type FC, useMemo } from 'react';

// enums
import { AssistantActivityEnum } from '@/enums/chat';

// types
import type { ActivityConfig, Props } from './types';

// utilities
import { cn } from '@/utilities/styles';

const ActivityPill: FC<Props> = ({ activity, className }) => {
  // memos
  const { Icon, label } = useMemo<ActivityConfig>(
    () =>
      ({
        [AssistantActivityEnum.ManualLookup]: {
          Icon: BookOpen,
          label: 'Lookup manual',
        },
        [AssistantActivityEnum.PowerCheck]: {
          Icon: BatteryCharging,
          label: 'Checking power data',
        },
        [AssistantActivityEnum.ReviewLog]: {
          Icon: ClipboardList,
          label: 'Reviewing logbook',
        },
        [AssistantActivityEnum.SystemCheck]: {
          Icon: Cpu,
          label: 'Inspecting onboard systems',
        },
        [AssistantActivityEnum.Thinking]: {
          Icon: Loader,
          label: 'Thinking',
        },
        [AssistantActivityEnum.WeatherCheck]: {
          Icon: CloudSun,
          label: 'Checking weather',
        },
      })[activity],
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

      {label}

      <span className="sr-only">in progress</span>
    </span>
  );
};

export default ActivityPill;
