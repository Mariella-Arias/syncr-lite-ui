// External Dependencies
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// UI Components
import SignupForm from '../../features/auth/components/SignupForm';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// Assets
import logo from '../../assets/logo.png';

// Types
import { IUserCreate } from '../../features/auth/types/auth.types';

/**
 * Signup Page Component
 *
 * Provides a user registration interface:
 * - Displays logo and page title
 * - Renders SignupForm
 * - Handles account creation process
 * - Navigates to login page after signup attempt
 */
const SignupPage = () => {
  // Hooks
  const { createAccount } = useAuthApi();
  const navigate = useNavigate();

  // Signup Submission Handler
  const handleSignup = async (values: IUserCreate) => {
    try {
      // Attempt to create user account
      await createAccount(values);

      // Show success toast notification
      toast.success('Activation link sent to your email', {
        duration: 5000,
        icon: '✉️',
      });
    } catch {
      toast.error('Failed to create account. Please try again.', {
        duration: 4000,
      });
    } finally {
      // Always navigate to login page
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        {/* Logo */}
        <img
          src={logo}
          className="mb-7 p-3"
        />

        {/* Page Title */}
        <p className="font-nunito text-3xl font-bold">Create your account</p>

        {/* Signup Form */}
        <SignupForm handleSubmit={handleSignup} />

        {/* Login Navigation */}
        <p>
          Already have an account?
          <Link to="/login">
            <span className="text-sky-450">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
