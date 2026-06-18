import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

type ContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>;

export default ContentProps;
