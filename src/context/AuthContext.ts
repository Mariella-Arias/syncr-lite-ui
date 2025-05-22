import { useContext, createContext } from 'react';

interface IAuthContext {
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};
