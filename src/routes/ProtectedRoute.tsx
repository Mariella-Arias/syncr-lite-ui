// Router Components
import { Outlet, Navigate } from 'react-router';

// External Dependencies
import { useSelector } from 'react-redux';

// Redux
import { selectIsAuthenticated } from '../features/auth/authSlice';

// Authentication Context
import { useAuth } from '../context/AuthContext';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-t-4 border-sky-450 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

/**
 * ProtectedRoute Component
 *
 * Guards routes that require authentication by:
 * - Displaying a loading spinner while authentication status is being verified
 * - Rendering child routes for authenticated users
 * - Redirecting to the login page for unauthenticated users
 *
 * The authentication check is performed by the AuthProvider when the app loads,
 * ensuring that the user's session is validated via API before
 * determining access to protected routes.
 *
 * @returns React component that conditionally renders protected content
 */
const ProtectedRoute = () => {
  const { isLoading } = useAuth();

  // Verify authentication status when component renders
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Show loading spinner while authentication status is being verified
  if (isLoading) {
    return <Loader />;
  }

  // Render protected routes or redirect to login based on authentication status
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;
