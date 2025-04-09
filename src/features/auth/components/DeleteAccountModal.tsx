import { AxiosError } from 'axios';

import { handleApiError } from '../../../services/api';
import DeleteAccountForm, { IDeleteAccountFormData } from './DeleteAccountForm';
import { useAuthApi } from '../hooks/useAuthApi';
import { useCenteredModalContext } from '../../../context/ModalsContext';

const DeleteAccountModal = () => {
  const { deleteAccount } = useAuthApi();
  const { close } = useCenteredModalContext();

  return (
    <div className="flex flex-col p-6 gap-1">
      <p className="font-nunito text-2xl font-bold self-center mt-3 mb-4">
        Delete Account
      </p>
      <p className="text-body-text">
        Are you sure you want to delete your account?
      </p>
      <p className="text-body-text">This action cannot be undone.</p>
      <p className="text-body-text mt-4">Enter password to confirm:</p>
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
