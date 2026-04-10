const RegisterUser = require('../../src/use-cases/RegisterUser');
const InMemoryUserRepository = require('../helpers/InMemoryUserRepository');
const FakePasswordHasher = require('../helpers/FakePasswordHasher');

describe('RegisterUser', () => {
  test('registers a new user with a hashed password', async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUser({ userRepository, passwordHasher: new FakePasswordHasher() });

    const result = await useCase.execute({ username: 'maya', password: 'secret', role: 'admin' });

    expect(result.message).toBe('User registered successfully!');
    expect(result.user.username).toBe('maya');
    expect(result.user.role).toBe('admin');
    expect(userRepository.items[0].password).toBe('hashed:secret');
  });

  test('defaults role to user when none is supplied', async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUser({ userRepository, passwordHasher: new FakePasswordHasher() });

    const result = await useCase.execute({ username: 'joe', password: 'secret' });

    expect(result.user.role).toBe('user');
  });

  test('rejects duplicate usernames', async () => {
    const userRepository = new InMemoryUserRepository([{ id: '1', username: 'maya', password: 'hashed:secret', role: 'user' }]);
    const useCase = new RegisterUser({ userRepository, passwordHasher: new FakePasswordHasher() });

    await expect(useCase.execute({ username: 'maya', password: 'secret' })).rejects.toMatchObject({
      message: 'Username already exists',
      statusCode: 409
    });
  });

  test('rejects missing credentials', async () => {
    const userRepository = new InMemoryUserRepository();
    const useCase = new RegisterUser({ userRepository, passwordHasher: new FakePasswordHasher() });

    await expect(useCase.execute({ username: '', password: '' })).rejects.toMatchObject({
      message: 'Username and password are required',
      statusCode: 400
    });
  });
});
