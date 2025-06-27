// Import the Express library to create the router
const express = require("express");

// Import controller functions that handle business logic for user routes
// These functions are defined in the '../controllers/user.js' file
const {
  handleGetAllUsers,       // Handles GET request to fetch all users
  handleGetUserById,       // Handles GET request to fetch a specific user by ID
  handleUpdateUserId,      // Handles PATCH request to update a user's data by ID
  handleDeleteUserById,    // Handles DELETE request to remove a user by ID
  handleCreateNewUser,     // Handles POST request to create a new user
} = require("../controllers/user");

// Import the User model (Mongoose schema)
const User = require("../models/user");

// Create a new router object from Express to define and group route handlers
const router = express.Router();

// ==================== Routes for All Users (GET, POST) ====================

// Define routes for the root path "/" using router.route()
// .get() is used to fetch all users from the database
// .post() is used to create a new user entry
router
  .route("/")
  .get(handleGetAllUsers)        // GET request: fetch all users
  .post(handleCreateNewUser);    // POST request: add a new user

// ==================== Routes for Specific User by ID ====================

// Define chained route handlers for "/:id", where ":id" is a dynamic route parameter
// These routes operate on individual users identified by their MongoDB _id
router
  .route("/:id")
  .get(handleGetUserById)        // GET request: fetch a user by ID
  .patch(handleUpdateUserId)     // PATCH request: update specific fields for a user by ID
  .delete(handleDeleteUserById); // DELETE request: remove user from DB by ID

// Export the router object so it can be used in other files (like index.js)
// This allows the route to be mounted via app.use("/user", userRouter)
module.exports = router;
