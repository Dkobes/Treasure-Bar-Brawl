import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  if (!secretKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(403).json({ error: 'Invalid token' }); // Forbidden
    }

    req.user = user; // You can add any additional properties to req.user if needed
    next();
  });
};

const signToken = (username, password, _id) => {
  const payload = { username, password, _id };
  const secretKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
}

export { authenticateToken, signToken };