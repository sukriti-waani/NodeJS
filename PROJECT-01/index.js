// npm i nodemon              // Install nodemon to auto-restart server on code changes (dev use)
// npm i mongoose             // Install mongoose to interact with MongoDB
// use "HTTP response status code" website   // For learning about status codes

const express = require("express"); // Import the Express framework
const fs = require("fs"); // Import Node's File System module for file operations
const { logReqRes } = require("./middlewares"); // Import custom middleware to log requests and responses
const { connectMongoDb } = require("./connection"); // Import function to connect to  MongoDB
const users = require("./MOCK_DATA.json"); // Import local static user data (used only if needed for testing)
const userRouter = require("./routes/user"); // Import routes defined for user-related operations

const app = express(); // Create an instance of the Express application
const PORT = 8000; // Define the port number on which the server will run

// --------------Connection to MongoDb----------------
// Connect to the MongoDB database at the specified URI (localhost in this case)
// "app-1" is the name of the database that will be created/used
connectMongoDb("mongodb://127.0.0.1:27017/app-1")
.then(() => console.log('Mongodb connected!'));

// --------------Middleware----------------
// Parse incoming URL-encoded data from forms (e.g., from HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse incoming JSON payloads in request bodies (e.g., from fetch or Postman)
app.use(express.json());

// Apply the custom logging middleware
// It will log each incoming request's method, path, and timestamp to "log.txt"
app.use(logReqRes("log.txt"));

// --------------Routes----------------
// Mount the user router on the "/user" path
// Any route in userRouter will be prefixed with "/user" (e.g., "/user/:id", "/user/")
app.use("/api/users", userRouter);

// --------------Start the Server----------------
// Start the server and listen on the defined port
// Once the server starts, it logs a confirmation message to the console
app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
