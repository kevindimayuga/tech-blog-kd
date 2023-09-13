const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    // Ex. If the user clicks on a link or button, it will bring them to the login page
    // if they are not logged in
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;