const express = require('express');

function buildAuthRoutes({ authController }) {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);

  return router;
}

module.exports = buildAuthRoutes;
