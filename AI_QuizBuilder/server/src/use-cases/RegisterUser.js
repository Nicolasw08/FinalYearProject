const AppError = require('../domain/errors/AppError');
const UserEntity = require('../domain/entities/UserEntity');

class RegisterUser {
  constructor({ userRepository, passwordHasher }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ username, password, role }) {
    if (!username || !password) {
      throw new AppError('Username and password are required', 400);
    }

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new AppError('Username already exists', 409);
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = new UserEntity({ username, password: hashedPassword, role: role || 'user' });
    const savedUser = await this.userRepository.create(user);

    return {
      message: 'User registered successfully!',
      user: {
        id: savedUser.id || savedUser._id,
        username: savedUser.username,
        role: savedUser.role
      }
    };
  }
}

module.exports = RegisterUser;
