'use client';
import { useContext, useMemo } from 'react';
import { useStore as useZustandStore } from 'zustand';

// contexts
import { StoreContext } from '@/contexts';

// providers
import StoreProvider from '@/providers/StoreProvider';

// types
import type { Store } from '@/types/store';

export default function useStore<T>(selector: (state: Store) => T): T {
  // contexts
  const context = useContext(StoreContext);
  // memos
  const _hookName = useMemo(() => 'useStore', []);

  if (!context) {
    throw new Error(`${_hookName} must be used within ${StoreProvider.displayName}`);
  }

  return useZustandStore(context, selector);
}
