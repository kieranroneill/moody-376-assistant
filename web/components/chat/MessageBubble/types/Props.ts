import type { ComponentProps, ReactElement } from 'react';

// components
import ActivityPill from '@/components/chat/ActivityPill';
import MessagePill from '@/components/chat/MessagePill';

// enums
import { MessageRoleEnum } from '@/enums/chat';

type Children =
  | ReactElement<ComponentProps<typeof ActivityPill>, typeof ActivityPill>
  | ReactElement<ComponentProps<typeof MessagePill>, typeof MessagePill>;

interface Props {
  children: Children;
  role: MessageRoleEnum;
  timestamp: string;
}

export default Props;
