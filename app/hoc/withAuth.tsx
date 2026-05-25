import { getAccessToken } from "@/app/utils/tokenStorage";
import { showToast } from '../../lib/toast';

export const withAuthAction = <T extends unknown[], R>(action: (...args: T) => R) => {
  return (...args: T): R | void => {
    const token = getAccessToken();
    if (!token) {
      showToast('error', 'You need to login to continue')
      return;
    }
    return action(...args);
  };
};

