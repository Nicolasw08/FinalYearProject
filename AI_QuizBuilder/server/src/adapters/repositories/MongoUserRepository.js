const UserRepository = require('../../domain/repositories/UserRepository');

class MongoUserRepository extends UserRepository {
  constructor({ userModel }) {
    super();
    this.userModel = userModel;
  }

  async findByUsername(username) {
    return this.userModel.findOne({ username });
  }

  async create(user) {
    return this.userModel.create(user);
  }
}

module.exports = MongoUserRepository;
