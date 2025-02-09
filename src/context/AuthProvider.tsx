import { ReactNode, useState, useEffect } from 'react';

import { AuthContext } from './AuthContext';
import api, { handleApiError } from '../services/api';
import { AxiosError } from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('auth/users/me/');
      console.log('Auth check successful:', response.data);

      setIsAuthenticated(true);
    } catch (err: unknown) {
      setIsAuthenticated(false);
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
