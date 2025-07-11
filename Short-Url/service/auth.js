// // Create a new Map object to store the mapping of session IDs to user data
// // This acts like an in-memory session store
// const sessionIdToUserMap = new Map();

// /**
//  * Function: setUser
//  * Purpose: Associates a session ID with a user object
//  * @param {string} id - The session ID
//  * @param {Object} user - The user data to associate with the session ID
//  */
// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user); // Store the user object with the session ID as the key
// }

// /**
//  * Function: getUser
//  * Purpose: Retrieves user data for a given session ID
//  * @param {string} id - The session ID
//  * @returns {Object|undefined} - The user object if found, otherwise undefined
//  */
// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

// // Export the setUser and getUser functions so they can be used in other files
// module.exports = {
//   setUser,
//   getUser,
// };

// Import the 'jsonwebtoken' package to create and verify JWTs
const jwt = require("jsonwebtoken");

// Define a secret key used for signing and verifying tokens
// This should be stored securely (e.g., in environment variables in production)
const secret = "Sukriti123@#";

/**
 * Function: setUser
 * Purpose: Create and return a signed JWT token for a user
 * @param {Object} user - The user object (usually from the database)
 * @returns {string} - A signed JWT token containing user data
 */
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id, // Embed user's unique ID in the token payload
      email: user.email, // Also include user's email in the payload
    },
    secret // Use the secret key to sign the token
  );
}

/**
 * Function: getUser
 * Purpose: Verify a JWT token and extract the user data if valid
 * @param {string} token - The JWT token sent from the client
 * @returns {Object|null} - The decoded user object if token is valid, otherwise null
 */
function getUser(token) {
  if (!token) return null; // Return null if no token is provided

  try {
    // Verify the token using the same secret used to sign it
    return jwt.verify(token, secret);
  } catch (error) {
    // If verification fails (e.g., expired or invalid token), return null
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};

/*
🔐 What is JWT (JSON Web Token)?
JWT stands for JSON Web Token — a compact, URL-safe token used to securely transmit information between two parties (like a client and server).

🧩 Structure of JWT:
A JWT consists of 3 parts, separated by dots:
Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6... (header)
eyJfaWQiOiIxMjM0IiwgImVtYWlsIjog... (payload)
AbcDefGhiJklMnoPqrStuVw... (signature)

✅ Why JWT is used:
To authenticate users (e.g., after login).
It allows stateless authentication — the server doesn't need to store session info.
Secure: Signed with a secret so it can't be forged easily.
We can decode the token to get user info like ID and email.

🧠 How It Works in our Code:
setUser(user) → generates a token after login.
That token is stored in a cookie or sent to the frontend.
When the user sends a request (like accessing the homepage), the backend calls getUser(token) to verify the token.
If the token is valid, the user is authenticated; else, they’re redirected to login.
*/
