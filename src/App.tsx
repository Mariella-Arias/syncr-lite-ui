import { createBrowserRouter, RouterProvider } from 'react-router';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ActivatePage from './pages/auth/ActivatePage';
import VerifySignupPage from './pages/auth/VerifySignupPage';
import ResetPasswordConfirmPage from './pages/auth/ResetPasswordConfirmPage';

function App() {
  const router = createBrowserRouter([
    { path: '/signup/verify', element: <VerifySignupPage /> }, // Transitory page to direct user to check email
    { path: '/signup', element: <SignupPage /> }, 
    { path: '/activate/:uid/:token', element: <ActivatePage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> }, // Request email to reset password
    { path: '/login', element: <LoginPage /> },
    {
      path: '/password/reset/confirm/:uid/:token',
      element: <ResetPasswordConfirmPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
