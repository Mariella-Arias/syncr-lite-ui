import { ReactNode, useState } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import api from '../services/api';
import { AuthContext } from './AuthContext';
import { AppDispatch } from '../app/store';
import { setUser } from '../features/auth/authSlice';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('auth/users/me/');
      dispatch(setUser(response));
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // TODO handle refresh token
        // console.log(handleApiError(err));
      }
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
