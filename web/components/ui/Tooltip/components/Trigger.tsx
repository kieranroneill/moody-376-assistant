'use client';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { type FC } from 'react';

// types
import type { TriggerProps as Props } from '../types';

const Trigger: FC<Props> = (props) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

export default Trigger;
