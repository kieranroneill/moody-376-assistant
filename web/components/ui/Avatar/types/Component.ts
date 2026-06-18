import type { FC } from 'react';

// components
import type GroupComponent from './GroupComponent';

// types
import BadgeProps from './BadgeProps';
import FallbackProps from './FallbackProps';
import GroupProps from './GroupProps';
import ImageProps from './ImageProps';

interface Component<Props> extends FC<Props> {
  Badge: FC<BadgeProps>;
  Fallback: FC<FallbackProps>;
  Group: GroupComponent<GroupProps>;
  Image: FC<ImageProps>;
}

export default Component;
