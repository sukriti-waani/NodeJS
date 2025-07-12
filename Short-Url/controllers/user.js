// Install with: npm i uuid
// Import `v4` method from the 'uuid' package and rename it as 'uuidv4'
// Used to generate a unique session ID for each user
const { v4: uuidv4 } = require("uuid");

// Import the User model for interacting with the users collection in MongoDB
const User = require("../models/user");

// Import the setUser function for mapping session IDs to users (in-memory session store)
const { setUser } = require("../service/auth");

/**
 * Controller to handle user signup logic
 */
async function handleUserSignUp(req, res) {
  // Destructure name, email, and password from the request body
  const { name, email, password } = req.body;

  // Create a new user document in the database
  await User.create({
    name,
    email,
    password, // In production, this should be hashed (e.g., using bcrypt)
  });

  // Redirect to the home page after successful signup
  return res.redirect("/");
}

/**
 * Controller to handle user login logic
 */
async function handleUserLogin(req, res) {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find a user matching the email and password
  // ⚠️ In production, use hashed password comparison instead of plain text
  const user = await User.findOne({ email, password });

  // If no user found, render login page with an error message
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }

  // Store the user object in the session map
  const token = setUser(user);

  // Set a cookie named 'token' in the browser with the generated token
  res.cookie("token", token);

  // Redirect the user to the home page upon successful login
  return res.redirect("/");
}

// Export the signup and login handler functions for use in routes
module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
