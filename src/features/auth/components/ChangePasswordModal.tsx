// External Dependencies
import toast from 'react-hot-toast';

// Hooks
import { useAuthApi } from '../hooks/useAuthApi';

// UI Components
import ChangePasswordForm from './ChangePasswordForm';

// Types
import { IChangePasswordFormData } from '../types/auth.types';

/**
 * Change Password Modal Component
 *
 * Provides a modal interface for changing user password:
 * - Renders ChangePasswordForm
 * - Handles password change submission
 * - Logs out user after successful password change
 */

const ChangePasswordModal = () => {
  // HOOKS
  const { changePassword, logout } = useAuthApi();

  // Password Change Submission Handler
  const handleSubmit = async (values: IChangePasswordFormData) => {
    try {
      await changePassword(values);
      await logout();

      // Success notification
      toast.success('Password changed successfully.', {
        duration: 4000,
        icon: '🔒',
      });
    } catch {
      // Error notification
      toast.error('Failed to change password. Please try again.', {
        duration: 4000,
      });
    }
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 gap-4">
      {/* Header */}
      <p className="font-nunito text-2xl font-bold my-2">Change Password</p>
      {/* Scrollable Form Content Area */}
      <div className="flex-1 overflow-y-auto">
        <ChangePasswordForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
