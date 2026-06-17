'use client';

import { useT } from 'next-i18next/client';
import { Battery, Gauge, CloudSun, Wrench, NotebookPen, ListChecks, LucideIcon } from 'lucide-react';
import { type FC, useMemo } from 'react';

// components
import Button from '@/components/ui/Button';

// types
import type { Props, QuickPromptItem } from './types';

const QuickPrompts: FC<Props> = ({ disabled, onSelect }) => {
  const { t } = useT();
  // memos
  const prompts = useMemo<QuickPromptItem[]>(() => {
    return ['batteryStatus', 'logEntry', 'maintenanceChecklist', 'powerUsage', 'troubleshoot', 'weather'].reduce<
      QuickPromptItem[]
    >((acc, key) => {
      let icon: LucideIcon | null = null;

      switch (key) {
        case 'batteryStatus':
          icon = Battery;
          break;
        case 'logEntry':
          icon = NotebookPen;
          break;
        case 'maintenanceChecklist':
          icon = ListChecks;
          break;
        case 'powerUsage':
          icon = Gauge;
          break;
        case 'troubleshoot':
          icon = Wrench;
          break;
        case 'weather':
          icon = CloudSun;
          break;
        default:
          break;
      }

      if (icon) {
        return [
          ...acc,
          {
            icon,
            labelKey: `chat:_quickPrompts.${key}.label`,
            promptKey: `chat:_quickPrompts.${key}.prompt`,
          },
        ];
      }

      return acc;
    }, []);
  }, [t]);

  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map(({ icon: Icon, labelKey, promptKey }) => (
        <Button
          key={labelKey}
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(t(promptKey))}
          className="h-9 rounded-full"
        >
          <Icon data-icon="inline-start" />

          {t(labelKey)}
        </Button>
      ))}
    </div>
  );
};

export default QuickPrompts;
