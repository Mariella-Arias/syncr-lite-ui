import { ReactNode, useState } from 'react';
import { AxiosError } from 'axios';

import api, { handleApiError } from '../services/api';
import { AuthContext } from './AuthContext';
import { ILoginCredentials } from '../features/auth/types/auth.types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('auth/users/me/');
      console.log('Auth check successful:', response);

      setIsAuthenticated(true);
    } catch (err: unknown) {
      setIsAuthenticated(false);
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

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
      const response = await api.post('api/token/blacklist/');
      setIsAuthenticated(false);
      console.log('Log out successful', response);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, checkAuthStatus, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
