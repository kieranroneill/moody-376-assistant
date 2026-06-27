import { Ship } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { type FC } from 'react';

// components
import ContextCard from '@/components/context/ContextCard';
import Stat from '@/components/ui/Stat';

// types
import type { Props } from './types';

const BoatSummaryContextCard: FC<Props> = ({ profile, specification }) => {
  const { t } = useT();

  return (
    <ContextCard title={t('boat:titles.boat')} icon={<Ship className="size-4" />}>
      <p className="text-sm font-semibold">{profile.name}</p>

      <p className="text-xs text-muted-foreground">
        {specification.make} {specification.model} · {profile.year}
      </p>

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
        <Stat label="Length" value={`${(specification.dimensions.loaMm / 1000).toFixed(2)} m`} />
        {profile.homePort && <Stat label="Home port" value={profile.homePort} />}
        {profile.callSign && <Stat label="Call sign" value={profile.callSign} />}
        {profile.hin && <Stat label="Hull ID" value={profile.hin} />}
      </dl>
    </ContextCard>
  );
};

export default BoatSummaryContextCard;
