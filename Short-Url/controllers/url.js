// Import shortid for generating unique short IDs
const { shortid } = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  // Get the request body (data sent by client)
  const body = req.body;

  // Check if the URL field is provided in the request body
  if (!body.url) {
    return res.status(400).json({ err: "URL is required" });
  }

  // Generate a unique 8-character short ID using nanoid
  const shortID = shortid();

  await URL.create({
    shortId: shortID, // Store the generated short ID
    redirectURL: body.url, // Store the original long URL
    visitedHistory: [], // Initialize visit history as an empty array
  });

  // Respond back to the client with the generated short ID
  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
