// Authentication middleware for protected routes.
const restrict = function(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/login');
  }
};

module.exports = restrict;