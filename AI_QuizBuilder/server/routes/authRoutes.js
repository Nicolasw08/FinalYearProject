const buildDependencies = require('../src/config/buildDependencies');
const buildAuthRoutes = require('../src/infrastructure/web/routes/authRoutes');
module.exports = buildAuthRoutes({ authController: buildDependencies().authController });
