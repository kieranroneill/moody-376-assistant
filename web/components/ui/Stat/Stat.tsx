import type { FC } from 'react';

// types
import type { Props } from './types';

const Stat: FC<Props> = ({ className, label, value }) => {
  return (
    <div className={className}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
};

export default Stat;
