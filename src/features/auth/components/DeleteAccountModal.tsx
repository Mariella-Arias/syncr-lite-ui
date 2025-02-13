import { AxiosError } from 'axios';

import { handleApiError } from '../../../services/api';
import Modal from '../../../components/overlays/Modal';
import DeleteAccountForm from './DeleteAccountForm';
import { useAuthApi } from '../hooks/useAuthApi';
import { useAuth } from '../../../context/AuthContext';

const DeleteAccountModal = () => {
  const { checkAuthStatus } = useAuth();
  const { deleteAccount } = useAuthApi();

  return (
    <Modal>
      <div className="flex flex-col gap-2">
        <p className="font-nunito text-2xl font-bold mt-2 self-center">
          Delete Account
        </p>
        <p>Are you sure you want to delete your account?</p>
        <p>Enter password to confirm:</p>
        <DeleteAccountForm
          handleSubmit={async (data: Record<string, string>) => {
            try {
              await deleteAccount({ current_password: data.password });
              await checkAuthStatus();
            } catch (err: unknown) {
              if (err instanceof AxiosError) {
                throw handleApiError(err);
              }
            }
          }}
        />
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
