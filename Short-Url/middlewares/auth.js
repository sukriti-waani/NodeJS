// Import the getUser function from the auth service
// This function retrieves user data from the in-memory session store using session ID
const { getUser } = require("../service/auth");

/**
 * Middleware: restrictToLoggedinUserOnly
 * Purpose: Allows access only if the user is logged in
 * Usage: Can be applied to routes that require authentication
 */
async function restrictToLoggedinUserOnly(req, res, next) {
  // Read the 'uid' cookie from the incoming request
  const userUid = req.cookies?.uid;

  // If no session ID is present, redirect to the login page
  if (!userUid) return res.redirect("/login");

  // Retrieve the user associated with the session ID from the session map
  const user = getUser(userUid);

  // If no user is found for the session, redirect to login
  if (!user) return res.redirect("/login");

  // Attach the user object to the request so that it can be accessed in the next middleware/route
  req.user = user;

  // Call next() to pass control to the next middleware or route handler
  next();
}

async function checkAuth(req, res, next) {
  // Read the 'uid' cookie from the incoming request
  const userUid = req.cookies?.uid;

  // Retrieve the user associated with the session ID from the session map
  const user = getUser(userUid);

  // Attach the user object to the request so that it can be accessed in the next middleware/route
  req.user = user;

  // Call next() to pass control to the next middleware or route handler
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
