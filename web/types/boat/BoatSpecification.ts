// types
import type BoatDimensions from './BoatDimensions';
import type Engine from './Engine';
import type FuelTanks from './FuelTanks';
import type Rigging from './Rigging';
import type SailArea from './SailArea';

interface BoatSpecification {
  builder: string | null;
  construction: string | null;
  designer: string | null;
  dimensions: BoatDimensions;
  engine: Engine | null;
  firstBuilt: number | null;
  hullType: string | null;
  lastBuilt: number | null;
  make: string;
  model: string;
  rigging: Rigging | null;
  sailArea: SailArea | null;
  tanks: FuelTanks | null;
}

export default BoatSpecification;
