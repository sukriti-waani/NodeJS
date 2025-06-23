// npm i nodemon
// use "HTTP response status code" website for reading 
const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Added to parse JSON bodies

app.use((req, res, next) => {
  // console.log("Hello from midlleware 1");
  // return res.json({mgs: "Hello from middleware 1"});
  // Append data to a file named 'log.txt' asynchronously
  fs.appendFile(
    "log.txt",
    // The data to append: a newline followed by timestamp, IP, HTTP method, and path
    `\n ${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,
    // Callback function executed after append operation completes
    (err, data) => {
      // Call the next middleware or route handler in the stack
      next();
    }
  );
});

// app.use((req, res, next) => {
//   console.log("Hello from midlleware 2", req.myUserName);
//   next();
// });

// Routes
app.get("/users", (req, res) => {
  // Create an HTML unordered list (ul) as a string
  const html = `
  <ul>
    ${
      // For each user in the 'users' array, create a list item (li) with their first name
      users.map((user) => `<li>${user.first_name}</li>`).join("")
      // The map() function creates an array of <li> strings, and join("") merges them into a single string without commas
    }
  </ul>
  `;

  // Send the generated HTML string as the response to the client
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Sukriti Waani"); // Custom header
  // Always add X to custom headers
  // Return all users as JSON
  return res.json(users);
});

// Handle PATCH request to update a specific user (currently pending implementation)
app.patch("/api/users", (req, res) => {
  // In real use, you'd update the user's data here using req.body (e.g., with express.json() middleware)

  // Send back a JSON response indicating the update is pending
  return res.json({ status: "Pending" });
});

// Handle DELETE request to remove a specific user (currently pending implementation)
app.delete("/api/users", (req, res) => {
  // In real use, you'd remove the user from the data store here

  // Send back a JSON response indicating deletion is pending
  return res.json({ status: "Pending" });
});

app.get("/api/users/:id", (req, res) => {
  // Extract the 'id' parameter from the request URL and convert it from string to number
  const id = Number(req.params.id);

  // Search for a user in the 'users' array whose 'id' matches the provided 'id'
  const user = users.find((user) => user.id === id);

  // Return the found user as a JSON response
  // If no user is found, 'user' will be undefined, and the response will be 'null'
  return res.json(user);
});

// POST route to create a new user (only one POST route kept)
app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({msg: 'All fields are required'})
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // Send back a JSON response indicating the creation is pending
    return res.status(201).json({ status: "pending" });
  });
});

app.patch("/api/users/:id", (req, res) => {
  // TODO : Edit the user with id
  return res.json({ status: "success", id: users.length });
});

app.delete("/api/users/:id", (req, res) => {
  // TODO : Delete the user with id
  return res.json({ status: "pending" });
});

// Start the server and listen on the defined PORT
app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
