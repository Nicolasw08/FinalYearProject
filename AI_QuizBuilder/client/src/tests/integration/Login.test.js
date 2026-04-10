import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../components/Login';
import { loginUser } from '../../services/authService';

const mockNavigate = jest.fn();

jest.mock('../../services/authService', () => ({
  loginUser: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    window.alert = jest.fn();
  });

  test('submits username and password through authService', async () => {
    loginUser.mockResolvedValue({ token: 'token-123' });
        render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), 'eliana');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({ username: 'eliana', password: 'secret123' });
    });
  });

  test('stores token and redirects after successful login', async () => {
    loginUser.mockResolvedValue({ token: 'token-123' });
        render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), 'eliana');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('token-123');
      expect(window.alert).toHaveBeenCalledWith('Login Successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('shows backend error message when login fails', async () => {
    loginUser.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });
        render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText(/username/i), 'eliana');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error: Invalid credentials');
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
