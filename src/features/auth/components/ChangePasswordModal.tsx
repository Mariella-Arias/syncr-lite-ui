import { useAuthApi } from '../hooks/useAuthApi';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordModal = () => {
  const { changePassword, logout } = useAuthApi();

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      await changePassword({
        current_password: values.password,
        new_password: values.newPassword,
        re_new_password: values.reNewPassword,
      });
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
