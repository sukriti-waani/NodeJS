// Create a new Map object to store the mapping of session IDs to user data
// This acts like an in-memory session store
const sessionIdToUserMap = new Map();

/**
 * Function: setUser
 * Purpose: Associates a session ID with a user object
 * @param {string} id - The session ID
 * @param {Object} user - The user data to associate with the session ID
 */
function setUser(id, user) {
  sessionIdToUserMap.set(id, user); // Store the user object with the session ID as the key
}

/**
 * Function: getUser
 * Purpose: Retrieves user data for a given session ID
 * @param {string} id - The session ID
 * @returns {Object|undefined} - The user object if found, otherwise undefined
 */
function getUser(id) {
  return sessionIdToUserMap.get(id);
}

// Export the setUser and getUser functions so they can be used in other files
module.exports = {
  setUser,
  getUser,
};
