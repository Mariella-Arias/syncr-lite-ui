import { Outlet, Navigate } from 'react-router';

import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  checkAuthStatus();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
