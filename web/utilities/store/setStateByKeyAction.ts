// types
import type { ActionOptions } from '@/types/store';

export default function setStateByKeyAction<Payload = undefined>(
  key: string,
  { api }: ActionOptions
): (payload: Payload) => void {
  return (value) =>
    api.setState((state) => ({
      ...state,
      [key]: value,
    }));
}
