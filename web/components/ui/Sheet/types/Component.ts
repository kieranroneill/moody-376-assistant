import type { FC } from 'react';

// types
import CloseProps from './CloseProps';
import ContentProps from './ContentProps';
import DescriptionProps from './DescriptionProps';
import FooterProps from './FooterProps';
import HeaderProps from './HeaderProps';
import OverlayProps from './OverlayProps';
import PortalProps from './PortalProps';
import TitleProps from './TitleProps';
import TriggerProps from './TriggerProps';

interface Component<Props> extends FC<Props> {
  Close: FC<CloseProps>;
  Content: FC<ContentProps>;
  Description: FC<DescriptionProps>;
  Footer: FC<FooterProps>;
  Header: FC<HeaderProps>;
  Overlay: FC<OverlayProps>;
  Portal: FC<PortalProps>;
  Title: FC<TitleProps>;
  Trigger: FC<TriggerProps>;
}

export default Component;
