module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.user.type != 2) {
    return res.status(403).json({ error: 'Access denied' });
  }

  next();
};