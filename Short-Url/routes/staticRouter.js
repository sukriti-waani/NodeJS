const express = require("express");
const URL = require("../models/url");

const router = express.Router();

/**
 * GET request to the root path "/"
 * This route renders the homepage with the list of all shortened URLs
 */
router.get("/", async (req, res) => {
  const allurls = await URL.find({}); // Fetch all URL documents from the MongoDB collection

  return res.render("home", {
    urls: allurls,  // Pass the list of URLs to the EJS template
    id: null         // No short ID to display initially (used for feedback after URL creation)
  });
});

/**
 * GET request to "/delete-all"
 * This route deletes all entries from the URL collection (for development/testing use)
 */
router.get("/delete-all", async (req, res) => {
  await URL.deleteMany({}); // Deletes all documents in the 'urls' collection
  res.send("✅ All URL entries have been deleted."); // Sends a simple text response to the browser
});

/**
 * GET request to "/signup"
 * This route renders the signup page (likely a form for user registration)
 */
router.get("/signup", (req, res) => {
  return res.render("signup"); // Renders the "signup.ejs" page from the views folder
});

router.get("/login", (req, res) => {
  return res.render("login"); // Renders the "login.ejs" page from the views folder
});


module.exports = router;
