import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { VariantProps } from 'class-variance-authority';

// utilities
import { createButtonVariants } from '@/components/ui/Button/utilities';

type Props = ButtonPrimitive.Props & VariantProps<typeof createButtonVariants>;

export default Props;
