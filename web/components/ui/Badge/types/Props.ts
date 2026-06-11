import { useRender } from '@base-ui/react/use-render';
import type { VariantProps } from 'class-variance-authority';

// utilities
import { createBadgeVariants } from '@/components/ui/Badge/utilities';

type Props = useRender.ComponentProps<'span'> & VariantProps<typeof createBadgeVariants>;

export default Props;
