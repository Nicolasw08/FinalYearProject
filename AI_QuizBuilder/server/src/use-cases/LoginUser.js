const AppError = require('../domain/errors/AppError');

class LoginUser {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute({ username, password }) {
    if (!username || !password) {
      throw new AppError('Username and password are required', 400);
    }

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isMatch = await this.passwordHasher.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 400);
    }

    const userId = user.id || user._id;
    const token = this.tokenService.sign({ id: userId, role: user.role });

    return {
      token,
      user: {
        id: userId,
        username: user.username,
        role: user.role
      }
    };
  }
}

module.exports = LoginUser;
