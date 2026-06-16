import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

export function ContextCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
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
}
