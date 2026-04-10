function buildAuthMiddleware({ tokenService }) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      req.user = tokenService.verify(token);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };
}

module.exports = buildAuthMiddleware;
