import { useContext, createContext } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  checkAuthStatus: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};
