// types
import type { Slice as BoatSlice } from '@/slices/createBoatSlice';
import type { Slice as SystemSlice } from '@/slices/createSystemSlice';

type Store = BoatSlice & SystemSlice;

export default Store;
