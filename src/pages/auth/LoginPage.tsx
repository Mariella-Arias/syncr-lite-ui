// React Imports
import { useEffect, useState } from 'react';

// External Dependencies
import { Link, Navigate } from 'react-router';

// UI Components
import LoginForm from '../../features/auth/components/LoginForm';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// Context
import { useAuth } from '../../context/AuthContext';

// Assets
import logo from '../../assets/logo.png';

// Types
import { ILoginCredentials } from '../../features/auth/types/auth.types';

/**
 * Loader Component
 *
 * Displays a centered spinning loader during authentication checks
 */
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

/**
 * Login Page Component
 *
 * Handles user authentication flow:
 * - Checks current authentication status
 * - Displays login form for unauthenticated users
 * - Redirects to home page if already authenticated
 */
const LoginPage = () => {
  // LOCAL STATE
  const [isLoading, setIsLoading] = useState(true);

  // HOOKS
  const { login } = useAuthApi();
  const { isAuthenticated, checkAuthStatus } = useAuth();

  // Authentication Status Check
  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    checkAuth();
  }, [checkAuthStatus]);

  // Loading State
  if (isLoading) {
    return <Loader />;
  }

  // Authentication Redirect
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img
          src={logo}
          className="mb-7 p-3"
        />
        <p className="font-nunito text-3xl font-bold">Welcome back</p>
        <LoginForm
          handleLogin={async (credentials: ILoginCredentials) => {
            try {
              await login(credentials);
            } catch (err: unknown) {
              console.log(err);
              // TODO add error notification
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
