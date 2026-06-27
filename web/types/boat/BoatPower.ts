// types
import type PowerConsumer from './PowerConsumer';
import type PowerReading from './PowerReading';

interface BoatPower {
  consumers: PowerConsumer[];
  reading: PowerReading;
}

export default BoatPower;
