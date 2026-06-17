// enums
import { ConnectionStatusEnum } from '@/enums/api';

// types
import type { BasicComponentProps } from '@/types/ui';

interface Props extends BasicComponentProps {
  status: ConnectionStatusEnum;
}

export default Props;
