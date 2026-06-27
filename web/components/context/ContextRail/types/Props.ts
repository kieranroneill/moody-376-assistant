// types
import type { BoatContext } from '@/types/boat';
import type { BasicComponentProps } from '@/types/ui';

interface Props extends BasicComponentProps {
  boat?: BoatContext;
  loading: boolean;
}

export default Props;
