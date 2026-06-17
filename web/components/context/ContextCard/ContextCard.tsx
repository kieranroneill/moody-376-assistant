import { type FC, type PropsWithChildren } from 'react';

// components
import Card from '@/components/ui/Card';

// types
import type { Props } from './types';

const ContextCard: FC<PropsWithChildren<Props>> = ({ action, children, icon, title }) => {
  return (
    <Card className="gap-0 py-0">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          {icon}

          {title}
        </h3>

        {action}
      </div>

      <div className="px-4 py-3.5">{children}</div>
    </Card>
  );
};

export default ContextCard;
