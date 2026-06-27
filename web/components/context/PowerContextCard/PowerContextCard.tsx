import { BatteryCharging, Plug, Sun, Zap } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC, useMemo } from 'react';

// components
import Badge from '@/components/ui/Badge';
import ContextCard from '@/components/context/ContextCard';
import Progress from '@/components/ui/Progress';
import Stat from '@/components/ui/Stat';

// types
import type { Props } from './types';

const PowerContextCard: FC<Props> = ({ consumers, reading }) => {
  const { t } = useT();
  // memos
  const batteryPercentageRemaining = useMemo(
    () => `${reading?.batteryPercentageRemaining.toString() || '-'}%`,
    [reading]
  );
  const batteryVoltage = useMemo(() => `${reading?.batteryVoltage.toFixed(1) || '-'} V`, [reading]);
  const estimatedHoursRemaining = useMemo(() => `${`~${reading?.estimatedHoursRemaining}` || '-'} h`, [reading]);
  const loadAmps = useMemo(() => `${reading?.loadAmps.toFixed(1) || '-'} A`, [reading]);
  const solarInputAmps = useMemo(() => `${reading?.solarInputAmps.toFixed(1) || '-'} A`, [reading]);
  const source = useMemo(() => {
    if (reading?.shorePower) {
      return t('boat:labels.shore');
    }

    if (reading?.engineCharging) {
      return t('boat:labels.engine');
    }

    return t('boat:labels.battery');
  }, [reading, t]);

  return (
    <ContextCard title={t('boat:titles.power')} icon={<BatteryCharging className="size-4" />}>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold tabular-nums">{batteryPercentageRemaining}</span>

        <span className="text-sm text-muted-foreground tabular-nums">{batteryVoltage}</span>
      </div>

      <Progress value={reading?.batteryPercentageRemaining || 0} className="mt-2 h-2" />

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <Stat label={t('boat:labels.houseLoad')} value={loadAmps} />
        <Stat label={t('boat:labels.solarIn')} value={solarInputAmps} />
        <Stat label={t('boat:labels.reserve')} value={estimatedHoursRemaining} />
        <Stat label={t('boat:labels.source')} value={source} />
      </dl>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {reading?.shorePower && (
          <Badge variant="secondary">
            <Plug data-icon="inline-start" />
            {t('boat:captions.shorePower')}
          </Badge>
        )}

        {reading?.solarInputAmps && reading.solarInputAmps > 0 && (
          <Badge variant="secondary">
            <Sun data-icon="inline-start" />
            {t('boat:captions.solarCharging')}
          </Badge>
        )}

        {reading?.engineCharging && (
          <Badge variant="secondary">
            <Zap data-icon="inline-start" />
            {t('boat:captions.engineCharging')}
          </Badge>
        )}
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t('boat:labels.topConsumers')}</p>

        <ul className="flex flex-col gap-1">
          {consumers.slice(0, 4).map((consumers) => (
            <li key={consumers.id} className="flex items-center justify-between text-xs">
              <span className="text-foreground">{consumers.name}</span>

              <span className="tabular-nums text-muted-foreground">{consumers.amps.toFixed(1)} A</span>
            </li>
          ))}
        </ul>
      </div>
    </ContextCard>
  );
};

export default PowerContextCard;
