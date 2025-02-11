import { AxiosError } from 'axios';

import api from '../../../services/api';
import { ILoginCredentials } from '../types/auth.types';
import { handleApiError } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const useAuthApi = () => {
  const { checkAuthStatus } = useAuth();

  const login = async (credentials: ILoginCredentials) => {
    try {
      await api.post('token/', credentials);
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const logout = async () => {
    try {
      await api.post('api/token/blacklist/');
      await checkAuthStatus();
      console.log('Logged out successfully');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const activate = async ({
    uid,
    token,
  }: {
    uid: string | undefined;
    token: string | undefined;
  }) => {
    try {
      await api.post('auth/users/activation/', { uid, token });
    } catch {
      console.log('ERROR VERIFYING');
    }
  };

  return { login, logout, activate };
};
