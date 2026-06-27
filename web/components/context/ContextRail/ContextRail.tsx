import { type FC, useMemo } from 'react';

// components
import BoatSummaryContextCard from '@/components/context/BoatSummaryContextCard';
import InstrumentsContextCard from '@/components/context/InstrumentsContextCard';
import LogbookContextCard from '@/components/context/LogbookContextCard';
import MaintenanceContextCard from '@/components/context/MaintenanceContextCard';
import PowerContextCard from '@/components/context/PowerContextCard';
import Skeleton from '@/components/ui/Skeleton';

// enums
import { AlertSeverityEnum } from '@/enums/notifications';

// types
import type { Props } from './types';

const ContextRail: FC<Props> = ({ boat, loading }) => {
  // memos
  const alertSeverityStyles = useMemo<Record<AlertSeverityEnum, string>>(
    () => ({
      [AlertSeverityEnum.Critical]: 'border-l-destructive bg-destructive/5',
      [AlertSeverityEnum.Info]: 'border-l-border bg-muted/40',
      [AlertSeverityEnum.Warning]: 'border-l-amber-500 bg-amber-500/5',
    }),
    []
  );

  if (loading || !boat) {
    return (
      <div className="flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Alerts */}
      {/*{alerts.length > 0 && (*/}
      {/*  <ContextCard title="Alerts" icon={<AlertTriangle className="size-4 text-amber-500" />}>*/}
      {/*    <ul className="flex flex-col gap-2">*/}
      {/*      {alerts.map((alert) => (*/}
      {/*        <li key={alert.id} className={cn('rounded-md border-l-2 px-3 py-2', alertSeverityStyles[alert.severity])}>*/}
      {/*          <div className="flex items-start gap-2">*/}
      {/*            {alert.severity === 'info' ? (*/}
      {/*              <Info className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />*/}
      {/*            ) : (*/}
      {/*              <AlertTriangle*/}
      {/*                className={cn(*/}
      {/*                  'mt-0.5 size-3.5 shrink-0',*/}
      {/*                  alert.severity === 'critical' ? 'text-destructive' : 'text-amber-500'*/}
      {/*                )}*/}
      {/*              />*/}
      {/*            )}*/}
      {/*            <div className="min-w-0">*/}
      {/*              <p className="text-sm font-medium leading-snug">{alert.title}</p>*/}
      {/*              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{alert.detail}</p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </li>*/}
      {/*      ))}*/}
      {/*    </ul>*/}
      {/*  </ContextCard>*/}
      {/*)}*/}

      {/* Boat summary */}
      <BoatSummaryContextCard profile={boat.profile} specification={boat.specification} />

      {/* Weather */}
      {/*<ContextCard*/}
      {/*  title="Weather"*/}
      {/*  icon={<CloudSun className="size-4" />}*/}
      {/*  action={<span className="text-xs text-muted-foreground">{formatTime(weather.updatedAt)}</span>}*/}
      {/*>*/}
      {/*  <div className="flex items-baseline justify-between">*/}
      {/*    <span className="text-2xl font-semibold tabular-nums">{weather.airTemperature}°C</span>*/}
      {/*    <span className="text-sm text-muted-foreground">{weather.condition}</span>*/}
      {/*  </div>*/}
      {/*  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">*/}
      {/*    <Stat label="Wind" value={`${weather.windSpeedKts} kts ${weather.windDirection}`} />*/}
      {/*    <Stat label="Gusts" value={`${weather.gustKts} kts`} />*/}
      {/*    <Stat*/}
      {/*      label="Pressure"*/}
      {/*      value={`${weather.pressureHpa} hPa ${weather.pressureTrend === 'falling' ? '↓' : weather.pressureTrend === 'rising' ? '↑' : '→'}`}*/}
      {/*    />*/}
      {/*    <Stat label="Visibility" value={`${weather.visibilityNm} NM`} />*/}
      {/*    <Stat label="Sea state" value={weather.seaState} className="col-span-2" />*/}
      {/*  </dl>*/}
      {/*</ContextCard>*/}

      {/* power */}
      <PowerContextCard reading={boat.power?.reading} consumers={boat.power?.consumers || []} />

      {/* instruments */}
      <InstrumentsContextCard items={boat.instruments} />

      {/* maintenance */}
      <MaintenanceContextCard items={boat.maintenance} />

      {/* Logbook */}
      <LogbookContextCard items={boat.logbook} />
    </div>
  );
};

export default ContextRail;
