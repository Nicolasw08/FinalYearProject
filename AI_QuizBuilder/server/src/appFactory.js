const express = require('express');
const cors = require('cors');
const buildDependencies = require('./config/buildDependencies');
const buildAuthRoutes = require('./infrastructure/web/routes/authRoutes');

function createApp(overrides = {}) {
  const app = express();
  const dependencies = buildDependencies(overrides);

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('AI Quiz Builder API is running...');
  });

  app.use('/api/auth', buildAuthRoutes({ authController: dependencies.authController }));

  return { app, dependencies };
}

module.exports = createApp;
