// External Dependencies
import { AxiosError } from 'axios';

// Services
import { handleApiError } from '../../../services/api';

// UI Components
import DeleteAccountForm from './DeleteAccountForm';

// Hooks
import { useAuthApi } from '../hooks/useAuthApi';

// Context
import { useCenteredModalContext } from '../../../context/ModalsContext';

// Types
import { IDeleteAccountFormData } from '../types/auth.types';

/**
 * Delete Account Modal Component
 *
 * Provides an account deletion interface:
 * - Displays confirmation message
 * - Renders DeleteAccountForm for password verification
 * - Handles account deletion process
 * - Manages modal closing
 */
const DeleteAccountModal = () => {
  // Hooks
  const { deleteAccount } = useAuthApi();
  const { close } = useCenteredModalContext();

  return (
    <div className="flex flex-col p-6 gap-1">
      {/* Modal Header */}
      <p className="font-nunito text-2xl font-bold self-center mt-3 mb-4">
        Delete Account
      </p>

      {/* Confirmation Message */}
      <p className="text-body-text">
        Are you sure you want to delete your account?
      </p>
      <p className="text-body-text">This action cannot be undone.</p>
      <p className="text-body-text mt-4">Enter password to confirm:</p>

      {/* Delete Account Form */}
      <DeleteAccountForm
        onCancel={() => close()}
        handleSubmit={async (data: IDeleteAccountFormData) => {
          try {
            await deleteAccount(data);
          } catch (err: unknown) {
            if (err instanceof AxiosError) {
              throw handleApiError(err);
            }
          }
        }}
      />
    </div>
  );
};

export default DeleteAccountModal;
