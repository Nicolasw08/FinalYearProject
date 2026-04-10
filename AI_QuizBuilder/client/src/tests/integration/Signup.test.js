import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../../components/Signup';
import { registerUser } from '../../services/authService';

const mockNavigate = jest.fn();

jest.mock('../../services/authService', () => ({
  registerUser: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Signup integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('submits full registration payload including selected role', async () => {
    registerUser.mockResolvedValue({ message: 'registered' });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'abc123' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'abc123',
        role: 'admin',
      });
    });
  });

  test('shows success alert and redirects to login on successful signup', async () => {
    registerUser.mockResolvedValue({ message: 'registered' });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'abc123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Registration Successful! Now please login.'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('shows error alert when signup fails', async () => {
    registerUser.mockRejectedValue({
      response: { data: { message: 'Username already exists' } },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'newuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'abc123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Error: Username already exists'
      );
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
