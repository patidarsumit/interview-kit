export function requireRole(role) {
  return (request, response, next) => {
    if (!request.user) {
      response.status(401).json({message: 'Unauthorized'});
      return;
    }

    if (request.user.role !== role) {
      response.status(403).json({message: 'Forbidden'});
      return;
    }

    next();
  };
}

