'use client';
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { type FC } from 'react';

// types
import type { TriggerProps as Props } from '../types';

const Trigger: FC<Props> = (props) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

export default Trigger;
