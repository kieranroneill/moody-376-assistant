import type { FC } from 'react';

// types
import ActionProps from './ActionProps';
import DescriptionProps from './DescriptionProps';
import TitleProps from './TitleProps';

interface Component<Props> extends FC<Props> {
  Action: FC<ActionProps>;
  Description: FC<DescriptionProps>;
  Title: FC<TitleProps>;
}

export default Component;
