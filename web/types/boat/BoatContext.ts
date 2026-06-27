// types
import type BoatPower from './BoatPower';
import type BoatProfile from './BoatProfile';
import type BoatSpecification from './BoatSpecification';
import type InstrumentReading from './InstrumentReading';
import type LogbookEntry from './LogbookEntry';
import type MaintenanceItem from './MaintenanceItem';

interface BoatContext {
  instruments: InstrumentReading[];
  logbook: LogbookEntry[];
  maintenance: MaintenanceItem[];
  power: BoatPower | null;
  profile: BoatProfile;
  specification: BoatSpecification;
}

export default BoatContext;
