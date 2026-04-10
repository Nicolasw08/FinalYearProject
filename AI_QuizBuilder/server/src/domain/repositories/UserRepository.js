class UserRepository {
  async findByUsername() {
    throw new Error('findByUsername must be implemented');
  }

  async create() {
    throw new Error('create must be implemented');
  }
}

module.exports = UserRepository;
