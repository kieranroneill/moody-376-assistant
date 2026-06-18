import type { FC } from 'react';

// types
import ContentProps from './ContentProps';
import ProviderProps from './ProviderProps';
import TriggerProps from './TriggerProps';

interface Component<Props> extends FC<Props> {
  Content: FC<ContentProps>;
  Provider: FC<ProviderProps>;
  Trigger: FC<TriggerProps>;
}

export default Component;
