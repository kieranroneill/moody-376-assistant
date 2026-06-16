import type { ComponentProps, ReactElement } from 'react';

// components
import ActivityPill from '@/components/chat/ActivityPill';
import MessagePill from '@/components/chat/MessagePill';
import ThinkingPill from '@/components/chat/ThinkingPill';

// enums
import { MessageRoleEnum } from '@/enums/chat';

type Children =
  | ReactElement<ComponentProps<typeof ActivityPill>, typeof ActivityPill>
  | ReactElement<ComponentProps<typeof MessagePill>, typeof MessagePill>
  | ReactElement<ComponentProps<typeof ThinkingPill>, typeof ThinkingPill>;

interface Props {
  children: Children;
  role: MessageRoleEnum;
  timestamp?: string;
}

export default Props;
