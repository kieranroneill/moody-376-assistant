import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';

interface ContentProps extends SheetPrimitive.Popup.Props {
  showCloseButton?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export default ContentProps;
