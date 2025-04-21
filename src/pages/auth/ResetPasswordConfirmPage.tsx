// External Dependencies
import { Link, useParams, useNavigate } from 'react-router';

// UI Components
import ResetPasswordForm from '../../features/auth/components/ResetPasswordForm';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// Assets
import logo from '../../assets/logo.png';

// Services
import { handleApiError } from '../../services/api';

// Types
import { AxiosError } from 'axios';
import { IResetPasswordFormData } from '../../features/auth/types/auth.types';

/**
 * Reset Password Confirmation Page Component
 *
 * Provides an interface for completing password reset:
 * - Extracts reset token and user ID from URL parameters
 * - Renders ResetPasswordForm
 * - Handles password reset submission
 * - Navigates user after successful password reset
 */
const ResetPasswordConfirmPage = () => {
  // Hooks
  const { resetPassword } = useAuthApi();
  const { uid, token } = useParams();
  const navigate = useNavigate();

  // Password Reset Handler
  const handleResetPassword = async (values: IResetPasswordFormData) => {
    const body = {
      uid,
      token,
      ...values,
    };
    try {
      await resetPassword(body);
      navigate('/', { replace: true });
      // TODO add success notification
    } catch (err: unknown) {
      // TODO add error notification and option to re send reset link
      if (err instanceof AxiosError) {
        throw handleApiError(err);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        <img
          src={logo}
          className="mb-7 p-3"
        />
        {/* Page Title */}
        <p className="font-nunito text-3xl font-bold">Reset your password</p>
        <p>Enter a new password below to change your password.</p>

        {/* Reset Password Form */}
        <ResetPasswordForm handleSubmit={handleResetPassword} />

        {/* Login Navigation */}
        <Link to="/login">
          <span className="text-sky-450 ">Back to Log In</span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;
