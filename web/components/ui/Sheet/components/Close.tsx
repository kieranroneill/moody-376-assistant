'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { CloseProps as Props } from '../types';

const Close: FC<Props> = (props) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

export default Close;
