import {
  AlertTriangle,
  BatteryCharging,
  CloudSun,
  Gauge,
  Info,
  NotebookPen,
  Ship,
  Wrench,
  Sun,
  Plug,
  Zap,
} from 'lucide-react';
import { type FC, useMemo } from 'react';

// components
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import ContextCard from '@/components/context/ContextCard';
import Skeleton from '@/components/ui/Skeleton';
import Stat from '@/components/ui/Stat';

// enums
import { MaintenanceStatusEnum } from '@/enums/boat';
import { AlertSeverityEnum } from '@/enums/notifications';

// types
import type { BadgeConfig, Props } from './types';

// utilities
import { formatRelativeTime, formatTime } from '@/utilities/date';
import { cn } from '@/utilities/styles';

const ContextRail: FC<Props> = ({ context, loading }) => {
  // memos
  const alertSeverityStyles = useMemo<Record<AlertSeverityEnum, string>>(
    () => ({
      [AlertSeverityEnum.Critical]: 'border-l-destructive bg-destructive/5',
      [AlertSeverityEnum.Info]: 'border-l-border bg-muted/40',
      [AlertSeverityEnum.Warning]: 'border-l-amber-500 bg-amber-500/5',
    }),
    []
  );
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

  if (loading || !context) {
    return (
      <div className="flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const { specification, weather, power, consumers, instruments, maintenance, logbook, alerts } = context;

  return (
    <div className="flex flex-col gap-4">
      {/* Alerts */}
      {alerts.length > 0 && (
        <ContextCard title="Alerts" icon={<AlertTriangle className="size-4 text-amber-500" />}>
          <ul className="flex flex-col gap-2">
            {alerts.map((alert) => (
              <li key={alert.id} className={cn('rounded-md border-l-2 px-3 py-2', alertSeverityStyles[alert.severity])}>
                <div className="flex items-start gap-2">
                  {alert.severity === 'info' ? (
                    <Info className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <AlertTriangle
                      className={cn(
                        'mt-0.5 size-3.5 shrink-0',
                        alert.severity === 'critical' ? 'text-destructive' : 'text-amber-500'
                      )}
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{alert.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{alert.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ContextCard>
      )}

      {/* Boat summary */}
      <ContextCard title="Boat" icon={<Ship className="size-4" />}>
        <p className="text-sm font-semibold">{specification.name}</p>
        <p className="text-xs text-muted-foreground">
          {specification.make} {specification.model} · {specification.year}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
          <Stat label="Length" value={`${specification.lengthMeters} m`} />
          <Stat label="Home port" value={specification.homePort} />
          {specification.callSign && <Stat label="Call sign" value={specification.callSign} />}
          {specification.hullID && <Stat label="Hull ID" value={specification.hullID} />}
        </dl>
      </ContextCard>

      {/* Weather */}
      <ContextCard
        title="Weather"
        icon={<CloudSun className="size-4" />}
        action={<span className="text-xs text-muted-foreground">{formatTime(weather.updatedAt)}</span>}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-semibold tabular-nums">{weather.airTemperature}°C</span>
          <span className="text-sm text-muted-foreground">{weather.condition}</span>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
          <Stat label="Wind" value={`${weather.windSpeedKts} kts ${weather.windDirection}`} />
          <Stat label="Gusts" value={`${weather.gustKts} kts`} />
          <Stat
            label="Pressure"
            value={`${weather.pressureHpa} hPa ${weather.pressureTrend === 'falling' ? '↓' : weather.pressureTrend === 'rising' ? '↑' : '→'}`}
          />
          <Stat label="Visibility" value={`${weather.visibilityNm} NM`} />
          <Stat label="Sea state" value={weather.seaState} className="col-span-2" />
        </dl>
      </ContextCard>

      {/* Electrical / power */}
      <ContextCard title="Power" icon={<BatteryCharging className="size-4" />}>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-semibold tabular-nums">{power.batteryPercentageRemaining}%</span>
          <span className="text-sm text-muted-foreground tabular-nums">{power.batteryVoltage.toFixed(1)} V</span>
        </div>
        <Progress value={power.batteryPercentageRemaining} className="mt-2 h-2" />
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
          <Stat label="House load" value={`${power.loadAmps.toFixed(1)} A`} />
          <Stat label="Solar in" value={`${power.solarInputAmps.toFixed(1)} A`} />
          <Stat label="Reserve" value={`~${power.estimatedHoursRemaining} h`} />
          <Stat label="Source" value={power.shorePower ? 'Shore' : power.engineCharging ? 'Engine' : 'Battery'} />
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {power.shorePower && (
            <Badge variant="secondary">
              <Plug data-icon="inline-start" />
              Shore power
            </Badge>
          )}
          {power.solarInputAmps > 0 && (
            <Badge variant="secondary">
              <Sun data-icon="inline-start" />
              Solar charging
            </Badge>
          )}
          {power.engineCharging && (
            <Badge variant="secondary">
              <Zap data-icon="inline-start" />
              Engine charging
            </Badge>
          )}
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Top consumers</p>
          <ul className="flex flex-col gap-1">
            {consumers.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center justify-between text-xs">
                <span className="text-foreground">{c.name}</span>
                <span className="tabular-nums text-muted-foreground">{c.amps.toFixed(1)} A</span>
              </li>
            ))}
          </ul>
        </div>
      </ContextCard>

      {/* Instruments */}
      <ContextCard title="Instruments" icon={<Gauge className="size-4" />}>
        <dl className="grid grid-cols-3 gap-3">
          {instruments.map((instrument) => (
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

      {/* Maintenance */}
      <ContextCard title="Maintenance" icon={<Wrench className="size-4" />}>
        <ul className="flex flex-col gap-2.5">
          {maintenance.map((item) => (
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

      {/* Logbook */}
      <ContextCard title="Recent log" icon={<NotebookPen className="size-4" />}>
        <ul className="flex flex-col gap-3">
          {logbook.map((entry) => (
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
    </div>
  );
};

export default ContextRail;
