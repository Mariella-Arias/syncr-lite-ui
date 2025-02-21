import { useAuthApi } from '../hooks/useAuthApi';
import ChangePasswordForm, {
  IChangePasswordFormData,
} from './ChangePasswordForm';

const ChangePasswordModal = () => {
  const { changePassword, logout } = useAuthApi();

  const handleSubmit = async (values: IChangePasswordFormData) => {
    try {
      await changePassword(values);
      await logout();
    } catch (err: any) {
      console.log(err);
      // TODO add error notification
    }
  };

  return (
    <div className="flex flex-col h-full px-12 py-8 gap-4">
      {/* Header */}
      <p className="font-nunito text-2xl font-bold my-2">Change Password</p>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <ChangePasswordForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
