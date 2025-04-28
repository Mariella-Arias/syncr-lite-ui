// React Imports
import { ReactNode, useState } from 'react';

// External Dependencies
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

// Services
import { handleApiError } from '../services/api';

// Context
import { AuthContext } from './AuthContext';

// Redux
import { AppDispatch } from '../app/store';
import { setUser } from '../features/auth/authSlice';

// Hooks
import authApi from '../features/auth/api/authApi';

/**
 * AuthProvider component
 *
 * Provides authentication state and methods to the entire application
 * through React Context. Manages authentication state and token refresh logic.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  /**
   * Check the user's authentication status
   *
   * This function:
   * 1. Attempts to fetch the current user's data
   * 2. If successful, updates Redux store and sets authenticated state
   * 3. If fails with 401, attempts to refresh the access token
   * 4. If refresh is successful, retries fetching user data
   * 5. If refresh fails, marks user as unauthenticated
   */
  const checkAuthStatus = async () => {
    try {
      const response = await authApi.getUser();

      // If successful, update state and Redux store
      dispatch(setUser(response));
      setIsAuthenticated(true);
    } catch (err: unknown) {
      // Handle authentication errors
      if (err instanceof AxiosError && err.response?.status === 401) {
        try {
          // Attemp refreshing token
          await authApi.refreshToken();

          // If refresh succeeded, try to get user data again
          const response = await authApi.getUser();

          // Update state with new user data
          dispatch(setUser(response));
          setIsAuthenticated(true);

          // Exit function to prevent setting isAuthenticated to false
          return;
        } catch (refreshError) {
          // Token refresh failed
          console.log('Error refreshing token', refreshError);
          setIsAuthenticated(false);
        }
      } else if (err instanceof AxiosError) {
        // Handle other API errors
        console.log('AUTH CONTEXT ERROR: ', handleApiError(err));
        setIsAuthenticated(false);
      } else {
        // Handle unexpected errors
        console.log('Unexpected Error: ', err);
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
