const LoginUser = require('../../src/use-cases/LoginUser');
const InMemoryUserRepository = require('../helpers/InMemoryUserRepository');
const FakePasswordHasher = require('../helpers/FakePasswordHasher');
const FakeTokenService = require('../helpers/FakeTokenService');

describe('LoginUser', () => {
  test('returns a token and sanitized user for valid credentials', async () => {
    const userRepository = new InMemoryUserRepository([
      { id: 'user-1', username: 'maya', password: 'hashed:secret', role: 'admin' }
    ]);
    const useCase = new LoginUser({
      userRepository,
      passwordHasher: new FakePasswordHasher(),
      tokenService: new FakeTokenService()
    });

    const result = await useCase.execute({ username: 'maya', password: 'secret' });

    expect(result.token).toBe('token:user-1:admin');
    expect(result.user).toEqual({ id: 'user-1', username: 'maya', role: 'admin' });
  });

  test('rejects an unknown user', async () => {
    const useCase = new LoginUser({
      userRepository: new InMemoryUserRepository(),
      passwordHasher: new FakePasswordHasher(),
      tokenService: new FakeTokenService()
    });

    await expect(useCase.execute({ username: 'missing', password: 'secret' })).rejects.toMatchObject({
      message: 'User not found',
      statusCode: 404
    });
  });

  test('rejects invalid passwords', async () => {
    const userRepository = new InMemoryUserRepository([
      { id: 'user-1', username: 'maya', password: 'hashed:secret', role: 'user' }
    ]);
    const useCase = new LoginUser({
      userRepository,
      passwordHasher: new FakePasswordHasher(),
      tokenService: new FakeTokenService()
    });

    await expect(useCase.execute({ username: 'maya', password: 'wrong' })).rejects.toMatchObject({
      message: 'Invalid credentials',
      statusCode: 400
    });
  });

  test('rejects missing credentials', async () => {
    const useCase = new LoginUser({
      userRepository: new InMemoryUserRepository(),
      passwordHasher: new FakePasswordHasher(),
      tokenService: new FakeTokenService()
    });

    await expect(useCase.execute({ username: '', password: '' })).rejects.toMatchObject({
      message: 'Username and password are required',
      statusCode: 400
    });
  });
});
