// External Dependencies
import { AxiosError } from 'axios';

// Services
import authApi from '../api/authApi';
import { handleApiError } from '../../../services/api';

// Hooks
import { useAuth } from '../../../context/AuthContext';

// Types
import { IUserCreate } from '../types/auth.types';
import { ILoginCredentials } from '../types/auth.types';
import { IChangePasswordFormData } from '../types/auth.types';
import { IDeleteAccountFormData } from '../types/auth.types';

/**
 *
 * Custom hook that provides authentication API operations with consistent error handling
 * and authentication state management through the AuthContext.
 *
 * @returns Object containing all authentication methods
 */
export const useAuthApi = () => {
  // Hooks
  const { checkAuthStatus } = useAuth();

  /**
   * Login
   *
   * Authenticates user with provided credentials and updates auth state
   *
   * @param credentials - User login credentials (username/password)
   * @throws Processed API error with user-friendly message
   */
  const login = async (credentials: ILoginCredentials) => {
    try {
      await authApi.login(credentials);
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Logout
   *
   * Logs out current user
   *
   * @throws Processed API error with user-friendly message
   */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Create Account
   *
   * Registers a new user account with the system
   *
   * @param data - User registration data
   * @throws Processed API error with user-friendly message
   */
  const createAccount = async (data: IUserCreate) => {
    try {
      await authApi.createAccount(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Activate Account
   *
   * Activates a user account using the UID and token from email verification link
   *
   * @param uid - User ID from activation link
   * @param token - Security token from activation link
   * @throws Processed API error with user-friendly message
   */
  const activateAccount = async ({
    uid,
    token,
  }: {
    uid: string | undefined;
    token: string | undefined;
  }) => {
    try {
      await authApi.activateAccount({ uid, token });
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Initiate Password Reset
   *
   * Sends password reset email to the provided username/email
   *
   * @param username - Object containing the username/email
   * @throws Processed API error with user-friendly message
   */
  const initiatePasswordReset = async (username: Record<string, string>) => {
    try {
      await authApi.initiatePasswordReset(username);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Reset Password
   *
   * Completes password reset process with token and new password
   *
   * @param data - Object containing reset token and new password
   * @throws Processed API error with user-friendly message
   */
  const resetPassword = async (data: Record<string, string | undefined>) => {
    try {
      await authApi.resetPassword(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Delete Account
   *
   * Permanently removes user account and updates auth state
   *
   * @param data - Account deletion confirmation data
   * @throws Processed API error with user-friendly message
   */
  const deleteAccount = async (data: IDeleteAccountFormData) => {
    try {
      await authApi.deleteAccount(data);
      await checkAuthStatus();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  /**
   * Change Password
   *
   * Updates password for authenticated user
   *
   * @param data - Current and new password data
   * @throws Processed API error with user-friendly message
   */
  const changePassword = async (data: IChangePasswordFormData) => {
    try {
      await authApi.changePassword(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return {
    activateAccount,
    changePassword,
    createAccount,
    deleteAccount,
    initiatePasswordReset,
    login,
    logout,
    resetPassword,
  };
};
