import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { AxiosError } from 'axios';

import logo from '../../assets/logo.png';
import LoginForm from '../../features/auth/components/LoginForm';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';
import { ILoginCredentials } from '../../features/auth/types/auth.types';
import { handleApiError } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

const LoginPage = () => {
  const { login } = useAuthApi();
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    checkAuth();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img src={logo} className="mb-7 p-3" />
        <p className="font-nunito text-3xl font-bold">Welcome back</p>
        <LoginForm
          handleLogin={async (credentials: Record<string, string>) => {
            try {
              await login(credentials);
            } catch (err: unknown) {
              if (err instanceof AxiosError) {
                throw handleApiError(err);
              }
            }
          }}
        />
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
