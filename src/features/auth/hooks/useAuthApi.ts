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

  const initiatePasswordReset = async (username: Record<string, string>) => {
    try {
      await api.post('auth/users/reset_password/', username);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const resetPassword = async (data: Record<string, string | undefined>) => {
    try {
      await api.post('auth/users/reset_password_confirm/', data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return { login, logout, activate, initiatePasswordReset, resetPassword };
};
