const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

// Define a GET route with a dynamic parameter ':shortId'
app.get("/:shortId", async (req, res) => {
  // Extract the 'shortId' from the URL parameters (e.g., /abc123 -> shortId = 'abc123')
  const shortId = req.params.shortId;

  // Search the database for a document matching the given 'shortId'
  // and simultaneously push a new timestamp entry into its visitHistory array
  const entry = await URL.findOneAndUpdate(
    { shortId }, // Condition to find the document with this shortId
    {
      $push: {
        // MongoDB update operator to push a new object into the 'visitHistory' array
        visitHistory: {
          timestamp: Date.now(), // Add current timestamp as visit time
        },
      },
    }
  );

  // If no matching document is found, send a 404 Not Found response
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  // If document is found, redirect the user to the original URL stored in 'redirectURL'
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:  ${PORT}`));
