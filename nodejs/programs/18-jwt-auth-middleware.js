import jwt from 'jsonwebtoken';

export function requireAuth(request, response, next) {
  const header = request.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    response.status(401).json({message: 'Missing token'});
    return;
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    response.status(401).json({message: 'Invalid token'});
  }
}

