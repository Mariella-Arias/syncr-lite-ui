import { Link, useNavigate } from 'react-router';
import { AxiosError } from 'axios';

import logo from '../../assets/logo.png';
import LoginForm from '../../features/auth/components/LoginForm';
import { ILoginCredentials } from '../../features/auth/types/auth.types';
import api, { handleApiError } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  const handleLogin = async (credentials: ILoginCredentials) => {
    try {
      await api.post('token/', credentials);
      await checkAuthStatus();
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Welcome back</p>
        <LoginForm handleLogin={handleLogin} />
        <Link to="/reset-password">
          <span className="text-sky-450">Forgot password?</span>
        </Link>
        <p>
          Don't have an account?
          <Link to="/signup">
            <span className="text-sky-450">&nbsp; Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
