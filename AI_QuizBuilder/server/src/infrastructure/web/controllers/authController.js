const AppError = require('../../../domain/errors/AppError');

function buildAuthController({ registerUser, loginUser }) {
  return {
    register: async (req, res) => {
      try {
        const result = await registerUser.execute(req.body);
        return res.status(201).json(result);
      } catch (error) {
        return handleError(error, res);
      }
    },

    login: async (req, res) => {
      try {
        const result = await loginUser.execute(req.body);
        return res.status(200).json(result);
      } catch (error) {
        return handleError(error, res);
      }
    }
  };
}

function handleError(error, res) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ error: error.message || 'Internal Server Error' });
}

module.exports = buildAuthController;
