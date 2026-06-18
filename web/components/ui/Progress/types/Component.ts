import type { FC } from 'react';

// types
import IndicatorProps from './IndicatorProps';
import LabelProps from './LabelProps';
import TrackProps from './TrackProps';
import ValueProps from './ValueProps';

interface Component<Props> extends FC<Props> {
  Indicator: FC<IndicatorProps>;
  Label: FC<LabelProps>;
  Track: FC<TrackProps>;
  Value: FC<ValueProps>;
}

export default Component;
