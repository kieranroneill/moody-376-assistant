// actions
import { fetchBoat } from './actions';

// types
import type { ActionOptions, StateCreator } from '@/types/store';
import type { Slice } from './types';

// utilities
import { createLogger } from '@/utilities/logging';

const createBoatSlice: StateCreator<Slice> = (setState, getState) => {
  const apiOptions: ActionOptions = {
    api: { getState, setState },
    logger: createLogger(getState().logLevel),
  };

  return {
    // actions
    fetchBoat: fetchBoat(apiOptions),
    // state
    boat: null,
    fetchingBoat: false,
  };
};

export default createBoatSlice;
