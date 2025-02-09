import { Outlet, Navigate, useLocation } from 'react-router';

import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  return isAuthenticated && location.pathname === '/login' ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
