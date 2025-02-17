import { useAuthApi } from '../hooks/useAuthApi';
import ChangePasswordForm, { IChangePassword } from './ChangePasswordForm';

const ChangePasswordModal = () => {
  const { changePassword, logout } = useAuthApi();

  const handleSubmit = async (values: IChangePassword) => {
    try {
      await changePassword(values);
      await logout();
    } catch (err: any) {
      console.log(err);
      // TODO add error notification
    }
  };

  return (
    <div className="h-full p-4">
      <p className="font-nunito text-2xl font-bold my-3">Change Password</p>
      <ChangePasswordForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default ChangePasswordModal;
