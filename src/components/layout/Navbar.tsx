import { useState, useRef, useEffect, RefObject } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import { auth } from '../../features/auth/authSlice';
import DeleteAccountModal from '../../features/auth/components/DeleteAccountModal';
import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../context/ModalsContext';
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

interface UserSettingsProps {
  menuRef: RefObject<HTMLDivElement>;
}

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(auth);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full p-2 flex flex-wrap md:flex-nowrap items-center justify-between ">
      {/* User Settings on small screens */}
      <div className="flex w-full items-center justify-between md:w-fit">
        <img
          src={logo}
          className="w-40 h-10 md:w-48 md:h-12 transition duration-300 ease-in-out"
          alt="Logo"
        />

        {/* USER MANAGEMENT */}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`bg-[#F3F2F2] p-3 md:hidden flex items-center gap-2 cursor-pointer relative ${
            isOpen ? 'shadow-md' : ''
          }`}
        >
          <p>{user?.email}</p>
          <ChevronDown
            className="text-[#9CA3AF]"
            strokeWidth={1.5}
            size={20}
          />
          {isOpen && <UserSettings menuRef={menuRef} />}
        </div>
      </div>

      {/* Nav Links */}
      <div className="order-last flex-grow w-full md:order-none md:w-auto md:flex-grow-0">
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className={`text-2xl hover:font-semibold ${
              location.pathname === '/' ? 'font-semibold' : ''
            }`}
          >
            DASHBOARD
          </Link>
          <Link
            to="/planner"
            className={`text-2xl hover:font-semibold ${
              location.pathname === '/planner' ? 'font-semibold' : ''
            }`}
          >
            PLANNER
          </Link>
          <Link
            to="/activity"
            className={`text-2xl hover:font-semibold ${
              location.pathname === '/activity' ? 'font-semibold' : ''
            }`}
          >
            ACTIVITY
          </Link>
        </div>
      </div>

      {/* User Settings on large screens */}
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`hidden bg-[#F3F2F2] p-3 md:flex items-center gap-3 md:w-fit cursor-pointer relative ${
          isOpen ? 'shadow-md' : ''
        }`}
      >
        <User
          strokeWidth={1.5}
          className="text-[#9CA3AF]"
        />
        <p>{user?.email}</p>
        {!isOpen && (
          <ChevronDown
            className="text-[#9CA3AF]"
            strokeWidth={1.5}
            size={20}
          />
        )}
        {isOpen && (
          <ChevronUp
            className="text-[#9CA3AF]"
            strokeWidth={1.5}
            size={20}
          />
        )}
        {isOpen && <UserSettings menuRef={menuRef} />}
      </div>
    </div>
  );
};

const UserSettings = ({ menuRef }: UserSettingsProps) => {
  const { logout } = useAuthApi();
  const { open: openSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal } = useCenteredModalContext();

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-b-[10px] shadow-md p-3 absolute top-full left-0 w-full flex flex-col z-50"
    >
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

export default Navbar;
