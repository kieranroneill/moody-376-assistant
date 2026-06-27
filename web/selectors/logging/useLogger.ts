'use client';
// hooks
import useStore from '@/hooks/useStore';

// types
import type { Logger } from '@/types/logging';

// utilities
import { createLogger } from '@/utilities/logging';

export default function useLogger(): Logger {
  const logLevel = useStore(({ logLevel }) => logLevel);

  return createLogger(logLevel);
}
