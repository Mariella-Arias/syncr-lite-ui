/**
 * @vitest-environment jsdom
 */

// React Imports
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// External Dependencies
import { cleanup, render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';

// Redux
import authReducer from '../../features/auth/authSlice';

// Components
import LoginPage from './LoginPage';
import ProtectedRoute from '../../routes/ProtectedRoute';
import AppLayout from '../../components/layout/AppLayout';

// Mock auth context
const mockAuthContext = {
  isLoading: false,
};

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock AppLayout component
vi.mock('../../components/layout/AppLayout', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  ),
}));

// TEST SUITE
describe('Login Page', () => {
  let testStore: any;

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    cleanup();

    // Create test store
    testStore = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
        },
      },
    });

    // Reset auth context
    mockAuthContext.isLoading = false;
  });

  const renderWithProviders = (
    initialEntries = ['/login'], // initial url
    store = testStore
  ) => {
    const router = createMemoryRouter(
      [
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <div>Signup Page</div> },
        { path: '/reset-password', element: <div>Reset Password Page</div> },
        {
          element: <ProtectedRoute />,
          children: [
            {
              element: <AppLayout />,
              children: [
                { path: '/', element: <div>Dashboard Page</div> },
                { path: '/planner', element: <div>Planner Page</div> },
                { path: '/activity', element: <div>Activity Page</div> },
              ],
            },
          ],
        },
      ],
      {
        initialEntries,
      }
    );

    return render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  test('shows login form when not authenticated', () => {
    renderWithProviders(['/login']);

    expect(screen.queryByText('Welcome back')).toBeTruthy();
    expect(screen.queryByText('Dashboard Page')).toBeNull();
  });

  test('redirects to authenticated route if already authenticated', async () => {
    // Create store with authenticated state
    const authenticatedStore = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: {
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
          },
        },
      },
    });

    renderWithProviders(['/login'], authenticatedStore);

    expect(screen.getByTestId('app-layout')).toBeTruthy(); // Pass
  });

  test('unauthenticated user gets redirected to login from protected route', () => {
    // Try to access protected route while not authenticated
    renderWithProviders(['/']);

    // Should be redirected to login
    expect(screen.getByText('Welcome back')).toBeTruthy();
    expect(screen.queryByTestId('app-layout')).toBeNull();
  });
});
