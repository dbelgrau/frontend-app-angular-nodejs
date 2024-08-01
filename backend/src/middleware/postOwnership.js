const jwt = require('jsonwebtoken');

postOwnershipMiddleware = (posts) => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    const resourceId = req.params.id;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing Token' });
    }

    try {
      const decoded = jwt.verify(token, 'secret_key'); 

      const post = posts.find(p => p.id === resourceId);

      if (decoded.userId !== post.author && decoded.userRole !== "ADMIN") {
        return res.status(403).json({ message: 'Forbidden - You are not the owner of this resource' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
  };
}

module.exports = postOwnershipMiddleware;