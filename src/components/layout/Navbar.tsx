import { useState } from 'react';
import { User } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import UserSettings from '../../features/auth/components/UserSettings';
import { auth } from '../../features/auth/authSlice';

const ChevronIcon = () => {
  return (
    <div className="border-t-2 border-r-2 w-2 h-2 rotate-135 border-solid "></div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(auth);

  return (
    <div className="w-full p-2 flex flex-wrap md:flex-nowrap items-center justify-between ">
      {/* User Settings on small screens */}
      <div className="flex w-full items-center justify-between md:w-fit">
        <img
          src={logo}
          className="w-40 h-10 md:w-48 md:h-12 transition duration-300 ease-in-out"
          alt="Logo"
        />
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`bg-[#F3F2F2] p-3 md:hidden flex items-center gap-2 cursor-pointer relative ${
            isOpen ? 'shadow-md' : ''
          }`}
        >
          <span className="hidden">
            <User strokeWidth={1.5} />
          </span>
          <p>{user?.email}</p>
          <ChevronIcon />
          {isOpen && <UserSettings />}
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
        onClick={() => setIsOpen((prev) => !prev)}
        className={`hidden bg-[#F3F2F2] p-3 md:flex items-center gap-3 md:w-fit cursor-pointer relative ${
          isOpen ? 'shadow-md' : ''
        }`}
      >
        <User strokeWidth={1.5} />
        <p>{user?.email}</p>
        <ChevronIcon />
        {isOpen && <UserSettings />}
      </div>
    </div>
  );
};

export default Navbar;
