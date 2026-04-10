class InMemoryUserRepository {
  constructor(seed = []) {
    this.items = [...seed];
  }

  async findByUsername(username) {
    return this.items.find((item) => item.username === username) || null;
  }

  async create(user) {
    const saved = { ...user, id: user.id || `user-${this.items.length + 1}` };
    this.items.push(saved);
    return saved;
  }
}

module.exports = InMemoryUserRepository;
