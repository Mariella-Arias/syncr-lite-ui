// React Imports
import { ReactNode, useState, useEffect } from 'react';

// External Dependencies
import { useDispatch } from 'react-redux';

// Context
import { AuthContext } from './AuthContext';

// Redux
import { AppDispatch } from '../app/store';
import { setUser } from '../features/auth/authSlice';

// Hooks
import authApi from '../features/auth/api/authApi';

/**
 * AuthProvider Component
 *
 * Provides authentication state and methods to the entire application through React Context.
 * Handles initial authentication verification on app load and manages loading states.
 *
 * Key responsibilities:
 * - Verifies user authentication status when the app starts
 * - Manages loading state during authentication checks
 * - Updates Redux store with user data or clears it on authentication failure
 * - Provides authentication methods to child components via context
 *
 * @param children - React components that will have access to authentication context
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  // Verify authentication status when the provider mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
