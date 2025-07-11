// use "EJS express" for documentation reading

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); // This middleware allows your Express app to automatically parse incoming JSON payloads.
// // Required for handling JSON data in POST/PUT requests.

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs"); // This tells Express to use "EJS" as the templating/view engine.
// So when we use `res.render("home")`, it will look for `home.ejs` in the views folder.

app.set("views", path.resolve("./views"));
// This sets the directory for the views (EJS files).
// `path.resolve("./views")` ensures the absolute path to the "views" folder is used,
// allowing `res.render()` to find templates inside it correctly.

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({}); // This route handles GET requests to `/test`.
//   // It fetches all documents from the `URL` collection in MongoDB using Mongoose's `find({})`.

//   return res.render("home", {
//     urls: allUrls,
//   }); // This renders the EJS template named "home.ejs" from the "views" folder.
//   // It passes the retrieved `allUrls` array to the template as a variable named `urls`.
//   // In the EJS file, you can now loop through `urls` and display their contents.
// });

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Define a GET route with a dynamic parameter ':shortId'
app.get("/url/:shortId", async (req, res) => {
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
