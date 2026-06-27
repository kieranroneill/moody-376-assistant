// services
import APIService from '@/services/APIService';

// types
import type { BoatContext } from '@/types/boat';
import type { ActionOptions } from '@/types/store';

export default function fetchBoat({ api, logger }: ActionOptions): () => Promise<void> {
  return async () => {
    const __functionName = 'fetchBoat';
    const apiService = new APIService();
    let boat: BoatContext;

    api.setState((state) => ({
      ...state,
      fetchingBoat: true,
    }));

    try {
      boat = await apiService.getBoat();

      logger.debug(`${__functionName}:`, boat);

      api.setState((state) => ({
        ...state,
        boat,
        fetchingBoat: false,
      }));
    } catch (error) {
      api.setState((state) => ({
        ...state,
        fetchingBoat: false,
      }));
    }
  };
}
