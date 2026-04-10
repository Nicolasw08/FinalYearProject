const buildAuthMiddleware = require('../../src/infrastructure/security/authMiddleware');
const FakeTokenService = require('../helpers/FakeTokenService');

describe('authMiddleware', () => {
  test('attaches decoded user and calls next for a valid token', () => {
    const middleware = buildAuthMiddleware({ tokenService: new FakeTokenService() });
    const req = { headers: { authorization: 'Bearer token:user-1:admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(req.user).toEqual({ id: 'user-1', role: 'admin' });
    expect(next).toHaveBeenCalled();
  });

  test('returns 401 when no authorization header exists', () => {
    const middleware = buildAuthMiddleware({ tokenService: new FakeTokenService() });
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  test('returns 401 when token verification fails', () => {
    const middleware = buildAuthMiddleware({ tokenService: new FakeTokenService() });
    const req = { headers: { authorization: 'Bearer invalid' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });
});
