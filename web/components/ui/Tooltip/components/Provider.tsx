'use client';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { type FC } from 'react';

// types
import type { ProviderProps as Props } from '../types';

const Provider: FC<Props> = (props) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};

export default Provider;
