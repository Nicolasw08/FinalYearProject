const bcrypt = require('bcryptjs');

class PasswordHasher {
  constructor(rounds = 10) {
    this.rounds = rounds;
  }

  async hash(value) {
    const salt = await bcrypt.genSalt(this.rounds);
    return bcrypt.hash(value, salt);
  }

  async compare(plainText, hashedValue) {
    return bcrypt.compare(plainText, hashedValue);
  }
}

module.exports = PasswordHasher;
