// types
import type { BoatContext } from '@/types/boat';
import type { BasicComponentProps } from '@/types/ui';

interface Props extends BasicComponentProps {
  context: BoatContext | null;
  loading: boolean;
}

export default Props;
