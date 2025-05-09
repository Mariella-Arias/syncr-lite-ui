// External Dependencies
import { Link, Navigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

// UI Components
import LoginForm from '../../features/auth/components/LoginForm';

// Redux
import { AppDispatch } from '../../app/store';
import { setUser, selectIsAuthenticated } from '../../features/auth/authSlice';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// Assets
import logo from '../../assets/logo.png';

// Types
import { ILoginCredentials } from '../../features/auth/types/auth.types';
import authApi from '../../features/auth/api/authApi';

/**
 * Login Page Component
 *
 * Handles user authentication flow:
 * - Checks current authentication status
 * - Displays login form for unauthenticated users
 * - Redirects to home page if already authenticated
 */
const LoginPage = () => {
  // HOOKS
  const { login } = useAuthApi();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
              // Attemp logging in user
              await login(credentials);

              // Update user info in redux
              const res = await authApi.getUser();
              dispatch(setUser(res));
            } catch {
              // Show error toast notification
              toast.error('Invalid username or password', {
                duration: 4000,
                icon: '❌',
              });

              // Update user authenticated status
              dispatch(setUser(null));
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
