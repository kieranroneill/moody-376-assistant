// components
import { Action, Description, Title } from './components';

// types
import type { Component, Props } from './types';

// utilities
import { createAlertVariants } from './utilities';
import { cn } from '@/utilities/styles';

const Alert: Component<Props> = ({ className, variant, ...props }) => {
  return <div className={cn(createAlertVariants({ variant }), className)} data-slot="alert" role="alert" {...props} />;
};

Alert.Action = Action;
Alert.Description = Description;
Alert.Title = Title;

export default Alert;
