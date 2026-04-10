const jwt = require('jsonwebtoken');

class TokenService {
  constructor(secret, expiresIn = '1h') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token) {
    return jwt.verify(token, this.secret);
  }
}

module.exports = TokenService;
