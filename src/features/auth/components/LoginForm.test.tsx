/**
 * @vitest-environment jsdom
 */

// External Dependencies
import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { expect, test, vi, describe, beforeEach } from 'vitest';

// Components
import LoginForm from './LoginForm.tsx';

describe('Login Form', () => {
  let mockHandleLogin: any;

  beforeEach(() => {
    mockHandleLogin = vi.fn();
    cleanup();
  });

  const renderForm = (handleLogin = mockHandleLogin) => {
    return render(<LoginForm handleLogin={handleLogin} />);
  };

  test('renders form fields correctly', () => {
    renderForm();

    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByText('Log In')).toBeTruthy();
  });

  test('shows validation errors for empty fields', async () => {
    renderForm();
    fireEvent.click(screen.getByText('Log In'));

    expect(await screen.findByText('Required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
  });

  test('calls handleLogin with form data on valid submission', async () => {
    renderForm();

    // Fill valid form data
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByText('Log In'));

    // Should call handleLogin with credentials
    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
