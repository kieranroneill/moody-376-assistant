// types
import type { BoatContext } from '@/types/boat';

interface Props {
  boat?: BoatContext;
  onSelect: (prompt: string) => void;
}

export default Props;
