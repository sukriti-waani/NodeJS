const path = require("path");
const express = require("express");

// Importing 'multer' middleware to handle file uploads
const multer = require("multer");

// Creating an Express application instance
const app = express();

// Defining the port number where the server will listen
const PORT = 8000;

// Configuring multer's storage settings for where and how to store uploaded files
const storage = multer.diskStorage({
  // Defines the destination folder to store uploaded files
  destination: function (req, file, cb) {
    return cb(null, "./uploads"); // Files will be stored in the 'uploads' folder
  },
  // Defines the filename of the uploaded file
  filename: function (req, file, cb) {
    // Files will be saved as a timestamp + original file name (e.g., 1625678912345-image.png)
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Creating the multer instance using the defined storage configuration
const upload = multer({ storage });

// Setting the view engine for rendering dynamic templates to EJS
app.set("view engine", "ejs");

// Setting the directory path where EJS templates are stored
app.set("views", path.resolve("./views"));

// Middleware to parse URL-encoded form data (for parsing form submissions)
app.use(express.urlencoded({ extended: false }));

// Route to serve the homepage when user visits root URL ('/')
app.get("/", (req, res) => {
  // Render the 'homepage.ejs' view from the 'views' directory
  return res.render("homepage");
});

// Route to handle the form submission with the file upload
app.post("/upload", upload.single("profileImage"), (req, res) => {
  // Logs the text fields from the form submission (if any)
  console.log(req.body);

  // Logs the uploaded file's details (like path, filename, size, etc.)
  console.log(req.file);

  // Redirects the user back to the homepage after uploading
  return res.redirect("/");
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
