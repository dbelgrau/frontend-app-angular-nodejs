const jwt = require('jsonwebtoken');

userOwnershipMiddleware = () => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    const userId = req.params.id;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }

    try {
      const decoded = jwt.verify(token, 'secret_key'); 

      if (decoded.userId !== userId && decoded.userRole !== "ADMIN") {
        return res.status(403).json({ message: 'Forbidden - You are not the owner of this resource' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
  };
}

module.exports = userOwnershipMiddleware;