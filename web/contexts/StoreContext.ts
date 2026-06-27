'use client';
import { createContext } from 'react';
import type { StoreApi } from 'zustand';

// types
import type { Store } from '@/types/stores';

const StoreContext = createContext<StoreApi<Store> | null>(null);

export default StoreContext;
