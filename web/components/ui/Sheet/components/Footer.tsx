import { type FC } from 'react';

// types
import type { FooterProps as Props } from '../types';

// utilities
import { cn } from '@/utilities';

const Footer: FC<Props> = ({ className, ...props }) => {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
};

export default Footer;
