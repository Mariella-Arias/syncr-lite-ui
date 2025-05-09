// React Imports
import { ReactNode } from 'react';

// External Dependencies
import { useDispatch, useSelector } from 'react-redux';

// Context
import { AuthContext } from './AuthContext';

// Redux
import { AppDispatch } from '../app/store';
import { setUser, selectIsAuthenticated } from '../features/auth/authSlice';

// Hooks
import authApi from '../features/auth/api/authApi';

/**
 * AuthProvider component
 *
 * Provides authentication state and methods to the entire application
 * through React Context. Manages authentication state and token refresh logic.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  /**
   * Check the user's authentication status
   *
   */
  const checkAuthStatus = async () => {
    try {
      const response = await authApi.getUser();

      // If successful, update user
      dispatch(setUser(response));
    } catch (err: unknown) {
      dispatch(setUser(null));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
