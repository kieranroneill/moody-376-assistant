// actions
import { fetchBoat } from './actions';

// types
import type { ActionAPI, StateCreator } from '@/types/stores';
import type { Slice } from './types';

const createBoatSlice: StateCreator<Slice> = (setState, getState) => {
  const api: ActionAPI = { getState, setState };

  return {
    // actions
    fetchBoat: fetchBoat({ api }),
    // state
    boat: null,
    fetchingBoat: false,
  };
};

export default createBoatSlice;
