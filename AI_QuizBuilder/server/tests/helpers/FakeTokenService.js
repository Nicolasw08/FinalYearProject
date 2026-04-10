class FakeTokenService {
  sign(payload) {
    return `token:${payload.id}:${payload.role}`;
  }

  verify(token) {
    if (token === 'invalid') {
      throw new Error('invalid');
    }

    const [, id, role] = token.split(':');
    return { id, role };
  }
}

module.exports = FakeTokenService;
