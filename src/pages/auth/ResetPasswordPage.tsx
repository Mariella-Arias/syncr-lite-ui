// External Dependencies
import { Link, useNavigate } from 'react-router';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// UI Components
import ResetPasswordRequestForm from '../../features/auth/components/ResetPasswordRequestForm';

// Assets
import logo from '../../assets/logo.png';

/**
 * Reset Password Page Component
 *
 * Provides an interface for initiating password reset:
 * - Displays logo and page title
 * - Renders ResetPasswordRequestForm
 * - Handles password reset initiation
 * - Navigates to login page after successful request
 */
const ResetPasswordPage = () => {
  // Hooks
  const { initiatePasswordReset } = useAuthApi();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        {/* Logo */}
        <img
          src={logo}
          className="mb-7 p-3"
        />

        {/* Page Title */}
        <p className="font-nunito text-3xl font-bold">Reset Password</p>
        <p>Enter your email to receive a password reset link.</p>

        {/* Reset Password Request Form */}
        <ResetPasswordRequestForm
          handleSubmit={async (username) => {
            try {
              // Initiate password reset
              await initiatePasswordReset(username);

              // Navigate to login page on successful password reset
              navigate('/login', { replace: true });
              // TODO add success notification
            } catch (err: unknown) {
              // TODO add error notification
              console.log(err);
            }
          }}
        />

        {/* Back to Login Link */}
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
