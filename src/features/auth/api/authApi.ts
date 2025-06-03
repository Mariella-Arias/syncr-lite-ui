// Services
import api from '../../../services/api';

// Types
import { IUserCreate } from '../types/auth.types';
import { ILoginCredentials } from '../types/auth.types';
import { IChangePasswordFormData } from '../types/auth.types';
import { IDeleteAccountFormData } from '../types/auth.types';

/**
 * Authentication API Service
 *
 * Provides methods for user authentication and account management:
 * - User login and logout
 * - Account creation and activation
 * - Password reset and change
 * - Account deletion
 */
const authApi = {
  /**
   * Activate user account using uid and token
   * @param uid User identifier
   * @param token Activation token
   */
  activateAccount: async ({
    uid,
    token,
  }: {
    uid: string | undefined;
    token: string | undefined;
  }) => {
    const response = await api.post('auth/users/activation/', { uid, token });
    return response;
  },

  /**
   * Change user account password
   * @param data Current and new password information
   */
  changePassword: async (data: IChangePasswordFormData) => {
    const response = await api.post('auth/users/set_password/', data);
    return response;
  },

  /**
   * Create a new user account
   * @param data User registration information
   */
  createAccount: async (data: IUserCreate) => {
    const response = await api.post('auth/users/', data);
    return response;
  },

  /**
   * Delete user account
   * @param data Current password for account deletion confirmation
   */
  deleteAccount: async (data: IDeleteAccountFormData) => {
    const response = await api.delete('auth/users/delete/', data);
    return response;
  },

  /**
   * Get current user information
   */
  getUser: async () => {
    const response = await api.get('auth/users/me/');
    return response;
  },

  /**
   * Initiate password reset process
   * @param username User's email address
   */
  initiatePasswordReset: async (username: Record<string, string>) => {
    const response = await api.post('auth/users/reset_password/', username);
    return response;
  },

  /**
   * Authenticate user and obtain access token
   * @param data User login credentials
   */
  login: async (data: ILoginCredentials) => {
    const response = await api.post('token/', data);
    return response;
  },

  /**
   * Logout user by blacklisting current token
   */
  logout: async () => {
    const response = await api.post('api/token/blacklist/');
    return response;
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async () => {
    const response = await api.post('token/refresh/');
    return response;
  },

  /**
   * Confirm password reset with new password
   * @param data Password reset confirmation data
   */
  resetPassword: async (data: Record<string, string | undefined>) => {
    const response = await api.post('auth/users/reset_password_confirm/', data);
    return response;
  },
};

export default authApi;
