const { Router } = require("express");
const User = require("../models/user");

// Create a new router instance
const router = Router();

// Define a GET route for '/signin' that renders the 'signin' view/page
router.get("/signin", (req, res) => {
  // Render the 'signin' template/page when this route is accessed
  return res.render("signin");
});

// Define a GET route for '/signup' that renders the 'signup' view/page
router.get("/signup", (req, res) => {
  // Render the 'signup' template/page when this route is accessed
  return res.render("signup");
});

// Define a POST route handler for '/signin'
router.post("/signin", async (req, res) => {
  
  // Extract 'email' and 'password' from the request body (form data sent by the user)
  const { email, password } = req.body;

  // Call the static method 'matchPassword' on the 'user' model to authenticate the user
  const user = await User.matchPassword(email, password);

  // Log the authenticated user details (excluding sensitive data if handled correctly)
  console.log("User", user);

  // Redirect the user to the homepage after successful login
  return res.redirect("/");

});


// Define a POST route for '/signup' to handle form submissions for user registration
router.post("/signup", async (req, res) => {
  // Destructure fullName, email, and password from the request body (form data)
  const { fullName, email, password } = req.body;

  // Create a new user in the database using the provided data
  await User.create({
    fullName,
    email,
    password,
  });

  // After successful signup, redirect the user to the homepage ("/")
  return res.redirect("/");
});

// Export the router so it can be used in other parts of the application
module.exports = router;
