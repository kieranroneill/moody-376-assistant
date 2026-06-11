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
  const activityConfig = useMemo<ActivityConfig>(
    () =>
      ({
        [AssistantActivityEnum.ManualLookup]: {
          icon: BookOpen,
          label: 'Lookup manual',
        },
        [AssistantActivityEnum.PowerCheck]: {
          icon: BatteryCharging,
          label: 'Checking power data',
        },
        [AssistantActivityEnum.ReviewLog]: {
          icon: ClipboardList,
          label: 'Reviewing logbook',
        },
        [AssistantActivityEnum.SystemCheck]: {
          icon: Cpu,
          label: 'Inspecting onboard systems',
        },
        [AssistantActivityEnum.Thinking]: {
          icon: Loader,
          label: 'Thinking',
        },
        [AssistantActivityEnum.WeatherCheck]: {
          icon: CloudSun,
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
      <activityConfig.icon className="size-3.5 animate-pulse" aria-hidden="true" />
      {activityConfig.label}
      <span className="sr-only">in progress</span>
    </span>
  );
};

export default ActivityPill;
