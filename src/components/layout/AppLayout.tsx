import { Outlet } from 'react-router';

import Navbar from './Navbar';
import { ModalProvider } from '../../context/ModalProvider';
import DeleteAccountModal from '../../features/auth/components/DeleteAccountModal';

const AppLayout = () => {
  return (
    <ModalProvider>
      <div className="w-screen h-screen">
        <DeleteAccountModal />
        <Navbar />
        <Outlet />
      </div>
    </ModalProvider>
  );
};

export default AppLayout;
