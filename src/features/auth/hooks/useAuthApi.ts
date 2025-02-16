import { AxiosError } from 'axios';

import authApi from '../api/authApi';
import { handleApiError } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

export const useAuthApi = () => {
  const { checkAuthStatus } = useAuth();

  const login = async (credentials: Record<string, string>) => {
    try {
      await authApi.login(credentials);
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const createAccount = async (data: Record<string, string>) => {
    try {
      await authApi.createAccount(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const activateAccount = async ({
    uid,
    token,
  }: {
    uid: string | undefined;
    token: string | undefined;
  }) => {
    try {
      await authApi.activateAccount({ uid, token });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const initiatePasswordReset = async (username: Record<string, string>) => {
    try {
      await authApi.initiatePasswordReset(username);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const resetPassword = async (data: Record<string, string | undefined>) => {
    try {
      await authApi.resetPassword(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const deleteAccount = async (data: Record<string, string>) => {
    try {
      await authApi.deleteAccount(data);
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  const changePassword = async (data: Record<string, string>) => {
    try {
      await authApi.changePassword(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return {
    createAccount,
    activateAccount,
    login,
    logout,
    initiatePasswordReset,
    resetPassword,
    deleteAccount,
    changePassword,
  };
};
