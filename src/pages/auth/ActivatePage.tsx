// React Imports
import { useState } from 'react';

// External Dependencies
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// UI Components
import Button from '../../components/common/Button';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

// Assets
import logo from '../../assets/logo.png';

/**
 * ActivatePage Component
 *
 * This component renders the account activation page that allows users
 * to verify their account using the UID and token from the URL.
 */
const ActivatePage = () => {
  // Local State to manage loading status during activation
  const [isLoading, setIsLoading] = useState(false);

  // Extract UID and token parameters from the URL
  const { uid, token } = useParams();

  // Hooks
  const navigate = useNavigate();
  const { activateAccount } = useAuthApi();

  /**
   * Handle account activation
   *
   * Sends the activation request with UID and token,
   * then redirects to login page on success
   */
  const handleActivation = async () => {
    setIsLoading(true);
    try {
      await activateAccount({ uid, token });

      // Show success toast notification
      toast.success('Account activated successfully!', {
        duration: 5000,
        icon: '✅',
      });

      // Redirect to login page
      navigate('/login');
    } catch {
      // Show error toast notification
      toast.error(
        'Failed to activate account. Please try again or contact support.',
        {
          duration: 4000,
        }
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center">
      {/* Account verification card */}
      <div className="translate-y-1/8 border-input-border border-1 shadow-md w-[400px] flex flex-col px-12 py-10 items-center gap-3 rounded-[10px]">
        {/* Logo */}
        <img
          src={logo}
          className="mb-7 p-3"
        />

        {/* Title and instructions */}
        <p className="font-nunito text-3xl font-bold">Verify your account</p>
        <p className="text-center mb-3">
          Your account is ready to be activated. Click the button below to
          complete the verification process.
        </p>

        {/* Verification button with loading state */}
        <Button
          size="medium"
          className="w-full"
          disabled={isLoading}
          onClick={handleActivation}
        >
          <div className="flex items-center justify-center h-full w-full">
            {isLoading ? (
              <span className="border-t-2 border-solid  w-7 h-7 rounded-full animate-spin"></span>
            ) : (
              <span className="text-lg">Verify</span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ActivatePage;
