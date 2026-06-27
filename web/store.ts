'use client';
import { devtools, persist, type PersistOptions } from 'zustand/middleware';
import { createStore, type StoreApi } from 'zustand/vanilla';

// constants
import { STORE_NAME } from '@/constants';

// slices
import createBoatSlice from '@/slices/createBoatSlice';
import createSystemSlice from '@/slices/createSystemSlice';

// types
import type { PersistedState, Store } from '@/types/store';

const store: () => StoreApi<Store> = () => {
  return createStore<Store>()(
    devtools(
      persist(
        (...api) => ({
          ...createSystemSlice(...api),
          ...createBoatSlice(...api),
        }),
        {
          name: STORE_NAME,
          partialize: ({ boat }) => ({
            boat,
          }),
          version: 0,
        } as PersistOptions<Store, PersistedState>
      ),
      {
        name: STORE_NAME,
      }
    )
  );
};

export default store;
