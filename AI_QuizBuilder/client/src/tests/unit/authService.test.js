import axios from 'axios';
import { loginUser, registerUser } from '../../services/authService';

jest.mock('axios');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loginUser posts credentials to the login endpoint', async () => {
    axios.post.mockResolvedValue({ data: { token: 'jwt-token' } });

    const result = await loginUser({ username: 'eliana', password: 'secret123' });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/login',
      { username: 'eliana', password: 'secret123' }
    );
    expect(result).toEqual({ token: 'jwt-token' });
  });

  test('registerUser posts signup payload to the register endpoint', async () => {
    axios.post.mockResolvedValue({ data: { message: 'registered' } });

    const result = await registerUser({ username: 'newuser', password: 'abc123', role: 'admin' });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/register',
      { username: 'newuser', password: 'abc123', role: 'admin' }
    );
    expect(result).toEqual({ message: 'registered' });
  });

  test('registerUser defaults role to user when role is not provided', async () => {
    axios.post.mockResolvedValue({ data: { message: 'registered' } });

    await registerUser({ username: 'newuser', password: 'abc123' });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/auth/register',
      { username: 'newuser', password: 'abc123', role: 'user' }
    );
  });
});
