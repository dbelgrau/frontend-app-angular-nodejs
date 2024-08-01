const jwt = require('jsonwebtoken');

authenticateMiddleware = (users) => {
  return (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }

    try {
      const decoded = jwt.verify(token, 'secret_key'); 

      const user = users.find(u => u.id === decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
  };
}

module.exports = authenticateMiddleware;