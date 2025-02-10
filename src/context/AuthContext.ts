import { useContext, createContext } from 'react';

import { ILoginCredentials } from '../features/auth/types/auth.types';

interface IAuthContext {
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};
