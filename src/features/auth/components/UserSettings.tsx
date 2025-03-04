import { useAuthApi } from '../hooks/useAuthApi';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../../context/ModalsContext';
import DeleteAccountModal from './DeleteAccountModal';
import ChangePasswordModal from './ChangePasswordModal';

const UserSettings = () => {
  const { logout } = useAuthApi();
  const { open: openSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal } = useCenteredModalContext();

  return (
    <div className="bg-white rounded-b-[10px] shadow-md p-3 absolute top-full left-0 w-full flex flex-col">
      <div
        onClick={async () => {
          await logout();
        }}
        className="text-body-text hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Log Out
      </div>
      <div
        onClick={() => {
          openSlideInModal(<ChangePasswordModal />);
        }}
        className="text-body-text hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Change Password
      </div>
      <div
        onClick={() => {
          openCenteredModal(<DeleteAccountModal />);
        }}
        className="text-red-550 hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Delete Account
      </div>
    </div>
  );
};

export default UserSettings;
