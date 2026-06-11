// enums
import { ConnectionStatusEnum } from '@/enums/api';

// types
import type {
  BoatDetails,
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
  details: BoatDetails;
  connection: ConnectionStatusEnum;
  consumers: PowerConsumer[];
  instruments: InstrumentReading[];
  logbook: LogbookEntry[];
  maintenance: MaintenanceItem[];
  power: PowerReading;
  weather: WeatherSnapshot;
}

export default BoatContext;
