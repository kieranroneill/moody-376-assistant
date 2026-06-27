// types
import type { BoatContext } from '@/types/boat';

interface Slice {
  // actions
  fetchBoat: () => Promise<void>;
  // state
  boat: BoatContext | null;
  fetchingBoat: boolean;
}

export default Slice;
