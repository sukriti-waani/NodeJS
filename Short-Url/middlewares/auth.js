// Import the getUser function from the auth service
// This function retrieves user data from the in-memory session store using session ID
const { getUser } = require("../service/auth");
// Import the getUser function which verifies the JWT token and returns the user if valid.

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  // This line retrieves the 'token' from cookies in the incoming HTTP request.
  // The optional chaining operator (?.) prevents errors if 'req.cookies' is undefined.
  // This is used when the JWT is stored in an HTTP-only cookie named 'token'.

  req.user = null;
  // Initialize req.user to null to clear any previous user data on each request.
  // This ensures a fresh authentication check every time.

  if (!tokenCookie) {
    // If no token is found in the cookie, the user is not authenticated.
    // Skip authentication and move on to the next middleware or route.
    return next();
  }

  const token = tokenCookie;
  // Assign the retrieved cookie value to the 'token' variable.
  // This token will be used for verification.

  const user = getUser(token);
  // Call the getUser function to verify the token and extract the user data.
  // If the token is valid, getUser returns a user object (e.g., {_id, email, role}).
  // If the token is invalid or expired, it may return null.

  if (user) {
    req.user = user;
    // If a valid user is returned, assign it to req.user.
    // This attaches the user info to the request object for access in future middleware/routes.
  }

  return next();
  // Proceed to the next middleware or route handler regardless of whether user is authenticated or not.
}

function restrictTo(roles = []) {
  // This function accepts an array of roles (e.g., ['admin', 'moderator']).
  // It returns a middleware function that restricts access to users with specific roles.

  return function (req, res, next) {
    // This is the actual middleware function that will be used in the route handler.
    // It has access to the current request (req), response (res), and next middleware (next).

    if (!req.user) {
      // If there is no authenticated user attached to the request (i.e., not logged in),
      // redirect the user to the login page.
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      // Check if the logged-in user's role is included in the allowed roles.
      // If not, deny access by ending the response with an "UnAuthorized" message.
      return res.end("UnAuthorized");
    }

    return next();
    // If the user is logged in and has the required role, allow the request to proceed
    // to the next middleware or route handler.
  };
}

/**
 * Middleware: restrictToLoggedinUserOnly
 * Purpose: Allows access only if the user is logged in
 * Usage: Can be applied to routes that require authentication
 */
// async function restrictToLoggedinUserOnly(req, res, next) {
//   // Read the 'uid' cookie from the incoming request
//   const userUid = req.cookies?.uid;

//   // If no session ID is present, redirect to the login page
//   if (!userUid) return res.redirect("/login");

//   // Retrieve the user associated with the session ID from the session map
//   const user = getUser(userUid);

//   // If no user is found for the session, redirect to login
//   if (!user) return res.redirect("/login");

//   // Attach the user object to the request so that it can be accessed in the next middleware/route
//   req.user = user;

//   // Call next() to pass control to the next middleware or route handler
//   next();
// }

// async function checkAuth(req, res, next) {
//   // Read the 'uid' cookie from the incoming request
//   const userUid = req.cookies?.uid;

//   // Retrieve the user associated with the session ID from the session map
//   const user = getUser(userUid);

//   // Attach the user object to the request so that it can be accessed in the next middleware/route
//   req.user = user;

//   // Call next() to pass control to the next middleware or route handler
//   next();
// }

module.exports = {
  // restrictToLoggedinUserOnly,
  // checkAuth,
  checkForAuthentication,
  restrictTo,
};
