// types
import type { BoatContext } from '@/types/boat';

interface UseBoatContextState {
  boatContext: BoatContext | null;
  fetch: () => Promise<void>;
  loading: boolean;
}

export default UseBoatContextState;
