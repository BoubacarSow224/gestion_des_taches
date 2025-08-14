const roleMiddleware = (roleAutorise) => {
  return (req, res, next) => {
    if (req.utilisateur && req.utilisateur.role === roleAutorise) {
      next();
    } else {
      res.status(403).json({ message: 'Accès interdit : rôle insuffisant' });
    }
  };
};

module.exports = roleMiddleware;
