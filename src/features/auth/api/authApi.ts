import api from '../../../services/api';
import { IUserCreate } from '../components/SignupForm';
import { IUserLogin } from '../components/LoginForm';
import { IChangePassword } from '../components/ChangePasswordForm';

const authApi = {
  login: async (data: IUserLogin) => {
    const response = await api.post('token/', data);
    return response;
  },

  logout: async () => {
    const response = await api.post('api/token/blacklist/');
    return response;
  },

  createAccount: async (data: IUserCreate) => {
    const response = await api.post('auth/users/', data);
    return response;
  },

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

  initiatePasswordReset: async (username: Record<string, string>) => {
    const response = await api.post('auth/users/reset_password/', username);
    return response;
  },

  resetPassword: async (data: Record<string, string | undefined>) => {
    const response = await api.post('auth/users/reset_password_confirm/', data);
    return response;
  },

  deleteAccount: async (data: Record<string, string>) => {
    const response = await api.delete('auth/users/me/', data);
    return response;
  },

  changePassword: async (data: IChangePassword) => {
    const response = await api.post('auth/users/set_password/', data);
    return response;
  },
};

export default authApi;
