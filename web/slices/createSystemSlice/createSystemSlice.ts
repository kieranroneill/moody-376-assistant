// enums
import { LogLevelEnum } from '@/enums/logging';

// types
import type { StateCreator } from '@/types/store';
import type { Slice } from './types';

const createSystemSlice: StateCreator<Slice> = () => {
  return {
    // state
    logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevelEnum) || LogLevelEnum.Error,
  };
};

export default createSystemSlice;
