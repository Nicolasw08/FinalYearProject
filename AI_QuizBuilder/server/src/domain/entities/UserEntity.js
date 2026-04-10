class UserEntity {
  constructor({ id = null, username, password, role = 'user', aiHitsPerHour = 0, lastAiHitAt = new Date() }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.aiHitsPerHour = aiHitsPerHour;
    this.lastAiHitAt = lastAiHitAt;
  }
}

module.exports = UserEntity;
