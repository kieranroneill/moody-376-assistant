// enums
import { ConnectionStatusEnum } from '@/enums/api';

// types
import type {
  BoatSpecification,
  InstrumentReading,
  LogbookEntry,
  MaintenanceItem,
  PowerConsumer,
  PowerReading,
} from '@/types/boat';
import type { Alert } from '@/types/notifications';
import type { WeatherSnapshot } from '@/types/weather';

interface BoatContext {
  alerts: Alert[];
  connection: ConnectionStatusEnum;
  consumers: PowerConsumer[];
  instruments: InstrumentReading[];
  logbook: LogbookEntry[];
  maintenance: MaintenanceItem[];
  power: PowerReading;
  specification: BoatSpecification;
  weather: WeatherSnapshot;
}

export default BoatContext;
