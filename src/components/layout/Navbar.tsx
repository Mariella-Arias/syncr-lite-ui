import { Link, useLocation } from 'react-router';
import logo from '../../assets/logo.png';

const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
};

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-wrap items-center md:flex-row justify-between  p-2 w-full">
      <img src={logo} className="w-48" />
      <div className="border-input-border border-1 w-45 p-2 md:order-last">
        <UserIcon />
      </div>

      <div className="flex justify-center w-full mt-4 md:mt-0 md:justify-start md:w-auto">
        <div className="flex gap-3">
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
    </div>
  );
};

export default Navbar;
