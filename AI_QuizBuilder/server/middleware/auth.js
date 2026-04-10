const buildDependencies = require('../src/config/buildDependencies');
const buildAuthMiddleware = require('../src/infrastructure/security/authMiddleware');
module.exports = { protect: buildAuthMiddleware({ tokenService: buildDependencies().tokenService }) };
