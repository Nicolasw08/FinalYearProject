class FakePasswordHasher {
  async hash(value) {
    return `hashed:${value}`;
  }

  async compare(plainText, hashedValue) {
    return hashedValue === `hashed:${plainText}`;
  }
}

module.exports = FakePasswordHasher;
