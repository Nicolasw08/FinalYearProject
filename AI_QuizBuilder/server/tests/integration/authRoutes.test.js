const request = require('supertest');
const createApp = require('../../src/appFactory');
const InMemoryUserRepository = require('../helpers/InMemoryUserRepository');
const FakePasswordHasher = require('../helpers/FakePasswordHasher');
const FakeTokenService = require('../helpers/FakeTokenService');
const RegisterUser = require('../../src/use-cases/RegisterUser');
const LoginUser = require('../../src/use-cases/LoginUser');
const buildAuthController = require('../../src/infrastructure/web/controllers/authController');

function buildTestApp(seed = []) {
  const userRepository = new InMemoryUserRepository(seed);
  const passwordHasher = new FakePasswordHasher();
  const tokenService = new FakeTokenService();
  const registerUser = new RegisterUser({ userRepository, passwordHasher });
  const loginUser = new LoginUser({ userRepository, passwordHasher, tokenService });
  const authController = buildAuthController({ registerUser, loginUser });

  return createApp({ userRepository, passwordHasher, tokenService, registerUser, loginUser, authController }).app;
}

describe('auth routes integration', () => {
  test('POST /api/auth/register creates a user', async () => {
    const app = buildTestApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'maya', password: 'secret', role: 'admin' });

    expect(response.statusCode).toBe(201);
    expect(response.body.user.username).toBe('maya');
    expect(response.body.user.role).toBe('admin');
  });

  test('POST /api/auth/register rejects duplicates', async () => {
    const app = buildTestApp([{ id: '1', username: 'maya', password: 'hashed:secret', role: 'user' }]);

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'maya', password: 'secret' });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('Username already exists');
  });

  test('POST /api/auth/login authenticates a valid user', async () => {
    const app = buildTestApp([{ id: 'user-1', username: 'maya', password: 'hashed:secret', role: 'admin' }]);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'maya', password: 'secret' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('token:user-1:admin');
    expect(response.body.user.username).toBe('maya');
  });

  test('POST /api/auth/login rejects a bad password', async () => {
    const app = buildTestApp([{ id: 'user-1', username: 'maya', password: 'hashed:secret', role: 'user' }]);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'maya', password: 'wrong' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
