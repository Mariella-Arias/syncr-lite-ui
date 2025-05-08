// External Dependencies
import { createSlice } from '@reduxjs/toolkit';

// Redux Store Configuration
import { RootState } from '../../app/store';

/**
 * User Interface
 *
 * Defines the structure of a user object in the application
 */
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Authentication State Interface
 *
 * Defines the structure of the authentication slice in the Redux store
 */
interface IAuthSlice {
  user: IUser | null;
}

/**
 * Initial state for the authentication slice
 *
 * Sets default values for authentication state (not authenticated)
 */
const initialState: IAuthSlice = {
  user: null,
};

/**
 * Authentication Redux Slice
 *
 * Defines the state management for authentication-related data:
 * - State initialization
 * - Actions and reducers for modifying authentication state
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets the authenticated user
     *
     * Transforms the API response format into the application's user format
     *
     * @param state Current authentication state
     * @param action Action with payload containing user data from API
     * @returns Updated authentication state with user information
     */
    setUser: (state, action) => {
      if (!action.payload) {
        state.user = null;
      } else {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          email,
        } = action.payload;
        state.user = {
          id,
          firstName,
          lastName,
          email,
        };
      }
      return state;
    },
  },
});

/**
 * Authentication Selector
 *
 * Returns the authentication slice from the Redux store
 *
 * @param state The root Redux state
 * @returns The authentication state
 */
export const auth = (state: RootState) => state.auth;

// Export actions for use in components
export const { setUser } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
