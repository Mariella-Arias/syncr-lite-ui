import { AxiosError } from 'axios';

import { handleApiError } from '../../../services/api';
import DeleteAccountForm, { IDeleteAccountFormData } from './DeleteAccountForm';
import { useAuthApi } from '../hooks/useAuthApi';

const DeleteAccountModal = () => {
  const { deleteAccount } = useAuthApi();

  return (
    <div className="flex flex-col gap-3 w-85  px-3 pb-3">
      <p className="font-nunito text-2xl font-bold self-center mt-2 mb-3">
        Delete Account
      </p>
      <p className="text-body-text mb-3">
        Are you sure you want to delete your account?
      </p>
      <p className="text-body-text">Enter password to confirm:</p>
      <DeleteAccountForm
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
