import { Outlet, Navigate } from 'react-router';

import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  checkAuthStatus();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
