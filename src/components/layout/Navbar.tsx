// React Imports
import { useState, useRef, useEffect, RefObject } from 'react';

// External Dependencies
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

// UI Components
import DeleteAccountModal from '../../features/auth/components/DeleteAccountModal';
import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';

// Assets
import logo from '../../assets/logo.png';

// Redux
import { auth } from '../../features/auth/authSlice';

// Context
import {
  useSlideInModalContext,
  useCenteredModalContext,
} from '../../context/ModalsContext';

// Hooks
import { useAuthApi } from '../../features/auth/hooks/useAuthApi';

/**
 * UserSettings Props Interface
 */
interface UserSettingsProps {
  menuRef: RefObject<HTMLDivElement>;
}

/**
 * Navbar Component
 *
 * Main navigation component that provides:
 * - Application branding
 * - Navigation links
 * - User account management
 *
 * Includes responsive design for both mobile and desktop layouts
 */
const Navbar = () => {
  // Hooks
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(auth);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Handle clicks outside the user settings dropdown to close it
   */
  useEffect(() => {
    // Skip if menu is already closed
    if (!isOpen) return;

    /**
     * Click outside handler to close the dropdown
     */
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Clean up event listeners on unmount or when dropdown closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full p-2 flex flex-wrap md:flex-nowrap items-center justify-between ">
      {/* Logo and Mobile User Menu Container */}
      <div className="flex w-full items-center justify-between md:w-fit">
        {/* Application Logo */}
        <img
          src={logo}
          className="w-40 h-10 md:w-48 md:h-12 transition duration-300 ease-in-out"
          alt="Logo"
        />

        {/* Mobile User Settings Dropdown (hidden on desktop) */}
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
          {/* Render dropdown when open */}
          {isOpen && <UserSettings menuRef={menuRef} />}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="order-last flex-grow w-full md:order-none md:w-auto md:flex-grow-0">
        <div className="flex justify-center gap-3">
          {/* Dashboard Link */}
          <Link
            to="/"
            className={`text-2xl hover:font-semibold ${
              location.pathname === '/' ? 'font-semibold' : ''
            }`}
          >
            DASHBOARD
          </Link>

          {/* Planner Link */}
          <Link
            to="/planner"
            className={`text-2xl hover:font-semibold ${
              location.pathname === '/planner' ? 'font-semibold' : ''
            }`}
          >
            PLANNER
          </Link>

          {/* Activity Link */}
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

      {/* Desktop User Settings Dropdown (hidden on mobile) */}
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`hidden bg-[#F3F2F2] p-3 md:flex items-center gap-3 md:w-fit cursor-pointer relative ${
          isOpen ? 'shadow-md' : ''
        }`}
      >
        {/* User Icon */}
        <User
          strokeWidth={1.5}
          className="text-[#9CA3AF]"
        />

        {/* User Email */}
        <p>{user?.email}</p>

        {/* Toggle Chevron Icons */}
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

        {/* Render dropdown when open */}
        {isOpen && <UserSettings menuRef={menuRef} />}
      </div>
    </div>
  );
};

/**
 * UserSettings Component
 *
 * Dropdown menu for user account management:
 * - Log out
 * - Change password
 * - Delete account
 *
 * @param {UserSettingsProps} props Component properties
 */
const UserSettings = ({ menuRef }: UserSettingsProps) => {
  // Hooks for authentication and modals
  const { logout } = useAuthApi();
  const { open: openSlideInModal } = useSlideInModalContext();
  const { open: openCenteredModal } = useCenteredModalContext();

  return (
    <div
      ref={menuRef}
      className="bg-white rounded-b-[10px] shadow-md p-3 absolute top-full left-0 w-full flex flex-col z-50"
    >
      {/* Logout Option */}
      <div
        onClick={async () => {
          await logout();
        }}
        className="text-body-text hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Log Out
      </div>

      {/* Change Password Option */}
      <div
        onClick={() => {
          openSlideInModal(<ChangePasswordModal />);
        }}
        className="text-body-text hover:bg-[#F3F2F2] rounded-[10px] p-2 text-lg"
      >
        Change Password
      </div>

      {/* Delete Account Option */}
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
