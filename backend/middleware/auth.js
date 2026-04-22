const User = require('../models/User');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required.' });

  const user = await User.findOne({ sessionToken: token });
  if (!user) return res.status(401).json({ message: 'Invalid session token.' });

  req.user = user;
  return next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    return next();
  };
}

module.exports = { requireAuth, requireRole };
