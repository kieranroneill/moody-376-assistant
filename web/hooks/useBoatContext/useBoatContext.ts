'use client';

import { useCallback, useState } from 'react';

// services
import APIService from '@/services/APIService';

// types
import type { UseBoatContextState } from './types';
import type { BoatContext } from '@/types/boat';

export default function useBoatContext(): UseBoatContextState {
  // states
  const [boatContext, setBoatContext] = useState<BoatContext | null>(null);
  const [loading, setLoading] = useState(true);
  // callbacks
  const fetch = useCallback(async () => {
    const apiService = new APIService();

    setLoading(true);

    try {
      const [] = await Promise.all([]);
    } catch (error) {}
    setBoatContext(await apiService.getBoat());
    setLoading(false);
  }, [setBoatContext, setLoading]);

  return {
    boatContext,
    fetch,
    loading,
  };
}
