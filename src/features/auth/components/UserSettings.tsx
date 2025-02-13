import { useAuthApi } from '../hooks/useAuthApi';
import { useModalContext } from '../../../context/ModalContext';

const UserSettings = () => {
  const { logout } = useAuthApi();
  const { openModal } = useModalContext();

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
      <div className="text-body-text hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg">
        Change Password
      </div>
      <div
        onClick={() => {
          openModal();
        }}
        className="text-red-550 hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Delete Account
      </div>
    </div>
  );
};

export default UserSettings;
