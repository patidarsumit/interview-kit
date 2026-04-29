export function validateCreateUser(request, response, next) {
  const {email, name} = request.body;

  if (typeof email !== 'string' || !email.includes('@')) {
    response.status(400).json({message: 'Valid email is required'});
    return;
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    response.status(400).json({message: 'Name is required'});
    return;
  }

  next();
}

