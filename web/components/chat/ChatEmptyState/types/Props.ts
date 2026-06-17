// types
import type { BoatSpecification } from '@/types/boat';

interface Props {
  boat: BoatSpecification | null;
  onSelect: (prompt: string) => void;
}

export default Props;
