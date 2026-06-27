// types
import type { PowerConsumer, PowerReading } from '@/types/boat';

interface Props {
  consumers: PowerConsumer[];
  reading?: PowerReading;
}

export default Props;
