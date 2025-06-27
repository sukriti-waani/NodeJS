// Import the Express library
const express = require("express");

// Import the Mongoose User model (assumes a schema is defined in ../models/user)
const User = require("../models/user");

// Create a new router object to define route handlers
const router = express.Router();

// ==================== GET All Users ====================

// Define a route to handle GET requests to "/"
// This route fetches all users from the MongoDB database
router.get("/", async (req, res) => {
  // Await the result of finding all users in the User collection
  const allDbUsers = await User.find({});

  // Send the array of user objects as a JSON response
  return res.json(allDbUsers);
});

// ==================== Routes for a Specific User (GET, PATCH, DELETE) ====================

// Chain route methods for "/:id" (where ":id" is a dynamic URL parameter representing user ID)
router
  .route("/:id")

  // GET request to fetch a single user by ID
  .get(async (req, res) => {
    // Find the user by ID from the URL parameter
    const user = await User.findById(req.params.id);

    // If user is not found, respond with 404 and an error message
    if (!user) return res.status(404).json({ error: "user not found" });

    // If found, send the user object as JSON
    return res.json(user);
  })

  // PATCH request to update a user's data
  .patch(async (req, res) => {
    // Update the user with the given ID by changing the lastName to "Changed"
    // (You can modify this to use dynamic updates from req.body)
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

    // Respond with a success status
    return res.json({ status: "Success" });
  })

  // DELETE request to remove a user from the database
  .delete(async (req, res) => {
    // Delete the user with the given ID
    await User.findByIdAndDelete(req.params.id);

    // Respond with a success status
    return res.json({ status: "Success" });
  });

// ==================== POST New User ====================

// Define a POST route to create a new user in the database
router.post("/", async (req, res) => {
  // Get the request body which contains user data
  const body = req.body;

  // Validate that all required fields are present in the request body
  if (
    !body || // body is undefined or null
    !body.first_name || // missing first_name
    !body.last_name || // missing last_name
    !body.email || // missing email
    !body.gender || // missing gender
    !body.job_title // missing job_title
  ) {
    // If any field is missing, return a 400 Bad Request response
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Create a new user in the MongoDB collection using the request data
  const result = await User.create({
    firstName: body.first_name, // Map input fields to DB model fields
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  // Respond with status 201 Created and a success message
  return res.status(201).json({ msg: "success" });
});

// Export the router object so it can be used in the main server file
module.exports = router;
