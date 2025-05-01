// Router Components
import { Outlet, Navigate } from 'react-router';

// Authentication Context
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 *
 * Guards routes that require authentication by:
 * - Checking the current authentication status
 * - Rendering child routes for authenticated users
 * - Redirecting to the login page for unauthenticated users
 *
 * @returns React component that conditionally renders protected content
 */
const ProtectedRoute = () => {
  // Get authentication state and verification function from context
  const { isAuthenticated, checkAuthStatus } = useAuth();

  // Verify authentication status when component renders
  checkAuthStatus();

  return isAuthenticated ? (
    // User is authenticated: render child routes
    <Outlet />
  ) : (
    // User is not authenticated: redirect to login
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;
