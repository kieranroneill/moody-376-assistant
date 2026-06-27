import type { StoreApi } from 'zustand';

// types
import type Store from 'types/stores/Store';

interface ActionAPI {
  getState: StoreApi<Store>['getState'];
  setState: StoreApi<Store>['setState'];
}

export default ActionAPI;
