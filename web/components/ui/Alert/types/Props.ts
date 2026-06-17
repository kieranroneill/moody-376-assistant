import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

// utilities
import { createAlertVariants } from '@/components/ui/Alert/utilities';

type Props = ComponentProps<'div'> & VariantProps<typeof createAlertVariants>;

export default Props;
