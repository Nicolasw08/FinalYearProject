const buildAuthController = require('../../src/infrastructure/web/controllers/authController');

function buildResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
}

describe('authController', () => {
  test('register responds with 201 and payload', async () => {
    const authController = buildAuthController({
      registerUser: { execute: jest.fn().mockResolvedValue({ message: 'ok' }) },
      loginUser: { execute: jest.fn() }
    });
    const res = buildResponse();

    await authController.register({ body: { username: 'maya', password: 'secret' } }, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'ok' });
  });

  test('login responds with 200 and payload', async () => {
    const authController = buildAuthController({
      registerUser: { execute: jest.fn() },
      loginUser: { execute: jest.fn().mockResolvedValue({ token: 'x' }) }
    });
    const res = buildResponse();

    await authController.login({ body: { username: 'maya', password: 'secret' } }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'x' });
  });

  test('maps application errors to their status code', async () => {
    const authController = buildAuthController({
      registerUser: { execute: jest.fn().mockRejectedValue({ name: 'AppError', message: 'Duplicate', statusCode: 409, constructor: { name: 'AppError' } }) },
      loginUser: { execute: jest.fn() }
    });
    const res = buildResponse();

    // use actual AppError instance to hit instanceof path
    const AppError = require('../../src/domain/errors/AppError');
    authController.register = buildAuthController({
      registerUser: { execute: jest.fn().mockRejectedValue(new AppError('Duplicate', 409)) },
      loginUser: { execute: jest.fn() }
    }).register;

    await authController.register({ body: {} }, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Duplicate' });
  });

  test('maps unexpected errors to 500', async () => {
    const authController = buildAuthController({
      registerUser: { execute: jest.fn().mockRejectedValue(new Error('Boom')) },
      loginUser: { execute: jest.fn() }
    });
    const res = buildResponse();

    await authController.register({ body: {} }, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Boom' });
  });
});
