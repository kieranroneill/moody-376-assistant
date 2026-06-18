'use client';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

// components
import Content from './components/Content';
import Provider from './components/Provider';
import Trigger from './components/Trigger';

// types
import type { Component, Props } from './types';

const Tooltip: Component<Props> = (props) => {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
};

Tooltip.Content = Content;
Tooltip.Provider = Provider;
Tooltip.Trigger = Trigger;

export default Tooltip;
