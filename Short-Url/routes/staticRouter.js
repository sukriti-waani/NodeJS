const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({}); // Fetch URL documents from the MongoDB collection

  return res.render("home", {
    urls: allurls, // Pass the list of URLs to the EJS template
    id: null, // No short ID to display initially (used for feedback after URL creation)
  });
});

/**
 * GET request to the root path "/"
 * This route renders the homepage with the list of all shortened URLs
 */
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");

  const allurls = await URL.find({ createdBy: req.user._id }); // Fetch URL documents from the MongoDB collection

  return res.render("home", {
    urls: allurls, // Pass the list of URLs to the EJS template
    id: null, // No short ID to display initially (used for feedback after URL creation)
  });
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
