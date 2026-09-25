/*
  This middleware checks if the user is authenticated
  before allowing access to protected routes.
*/

const isAuthenticated = (req, res, next) => {
  // Allows the request to continue when the user is logged in
  if (req.isAuthenticated()) {
    return next();
  }

  // Blocks access when the user is not authenticated
  return res.status(401).json({
    error: 'Authentication required'
  });
};

module.exports = {
  isAuthenticated
};