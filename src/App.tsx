// External Dependencies
import { createHashRouter, RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';

// UI Components
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import ActivatePage from './pages/auth/ActivatePage';
import VerifySignupPage from './pages/auth/VerifySignupPage';
import ResetPasswordConfirmPage from './pages/auth/ResetPasswordConfirmPage';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import PlannerPage from './pages/planner/PlannerPage';
import ActivityPage from './pages/activity/ActivityPage';
import ProtectedRoute from './routes/ProtectedRoute';

// Context
import { AuthProvider } from './context/AuthProvider';

function App() {
  const router = createHashRouter([
    { path: '/signup/verify', element: <VerifySignupPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/activate/:uid/:token', element: <ActivatePage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    { path: '/login', element: <LoginPage /> },
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
            { path: '/', element: <DashboardPage /> },
            { path: '/planner', element: <PlannerPage /> },
            { path: '/activity', element: <ActivityPage /> },
          ],
          errorElement: <div>Error Element</div>,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
