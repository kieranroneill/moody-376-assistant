import type { FC } from 'react';

// types
import CountProps from './CountProps';

interface GroupComponent<Props> extends FC<Props> {
  Count: FC<CountProps>;
}

export default GroupComponent;
