const UserModel = require('../infrastructure/persistence/UserModel');
const MongoUserRepository = require('../adapters/repositories/MongoUserRepository');
const PasswordHasher = require('../infrastructure/security/PasswordHasher');
const TokenService = require('../infrastructure/security/TokenService');
const RegisterUser = require('../use-cases/RegisterUser');
const LoginUser = require('../use-cases/LoginUser');
const buildAuthController = require('../infrastructure/web/controllers/authController');

function buildDependencies(overrides = {}) {
  const userRepository = overrides.userRepository || new MongoUserRepository({ userModel: UserModel });
  const passwordHasher = overrides.passwordHasher || new PasswordHasher();
  const tokenService = overrides.tokenService || new TokenService(process.env.JWT_SECRET || 'test-secret');

  const registerUser = overrides.registerUser || new RegisterUser({ userRepository, passwordHasher });
  const loginUser = overrides.loginUser || new LoginUser({ userRepository, passwordHasher, tokenService });
  const authController = overrides.authController || buildAuthController({ registerUser, loginUser });

  return {
    userRepository,
    passwordHasher,
    tokenService,
    registerUser,
    loginUser,
    authController
  };
}

module.exports = buildDependencies;
