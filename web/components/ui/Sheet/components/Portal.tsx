'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { PortalProps as Props } from '../types';

const Portal: FC<Props> = (props) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

export default Portal;
