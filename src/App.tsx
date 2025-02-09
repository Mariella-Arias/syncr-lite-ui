import { createBrowserRouter, RouterProvider } from 'react-router';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ActivatePage from './pages/auth/ActivatePage';
import VerifySignupPage from './pages/auth/VerifySignupPage';
import ResetPasswordConfirmPage from './pages/auth/ResetPasswordConfirmPage';
import AppLayout from './components/layout/AppLayout';

import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';

import { AuthProvider } from './context/AuthProvider';

function App() {
  const router = createBrowserRouter([
    { path: '/signup/verify', element: <VerifySignupPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/activate/:uid/:token', element: <ActivatePage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    {
      element: <PublicRoute />,
      children: [{ path: '/login', element: <LoginPage /> }],
    },
    {
      path: '/password/reset/confirm/:uid/:token',
      element: <ResetPasswordConfirmPage />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { path: '/', element: <div>DASHBOARD TAB</div> },
            { path: '/planner', element: <div>PLANNER TAB</div> },
            { path: '/activity', element: <div>ACTIVITY TAB</div> },
          ],
          errorElement: <div>Error Element</div>,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
