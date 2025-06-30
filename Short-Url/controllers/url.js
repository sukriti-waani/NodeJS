// Import shortid for generating unique short IDs
const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  // Get the request body (data sent by client)
  const body = req.body;

  // Check if the URL field is provided in the request body
  if (!body.url) {
    return res.status(400).json({ err: "URL is required" });
  }

  // Generate a unique 8-character short ID using nanoid
  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID, // Store the generated short ID
    redirectURL: body.url, // Store the original long URL
    visitedHistory: [], // Initialize visit history as an empty array
  });

  // Respond back to the client with the generated short ID
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  // Extract 'shortId' from the URL parameters (e.g., /analytics/abc123 -> shortId = 'abc123')
  const shortId = req.params.shortId;

  // Query the database to find the document that matches the given 'shortId'
  const result = await URL.findOne({ shortId });

  // Return a JSON response:
  // - 'totalClicks': number of times the short URL has been visited
  // - 'analytics': the full visit history array with all timestamps
  return res.json({
    totalClicks: result.visitedHistory.length, // Count of entries in the visitedHistory array
    analytics: result.visitedHistory, // The array containing each visit timestamp
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
