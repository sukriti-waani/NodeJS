const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
  return res.json(users);
}) 
 // Handle PATCH request to update a specific user (currently pending implementation)
  .patch((req, res) => {
    // In real use, you'd update the user's data here using req.body (e.g., with express.json() middleware)
    
    // Send back a JSON response indicating the update is pending
    return res.json({ status: "Pending" });
  })

  // Handle DELETE request to remove a specific user (currently pending implementation)
  .delete((req, res) => {
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

app.post("/api/users", (req, res) => {
  // TODO : Create new user
  return res.json({ status: "pending" });
});

app.patch("/api/users/:id", (req, res) => {
  // TODO : Edit the user with id
  return res.json({ status: "pending" });
});

app.delete("/api/users/:id", (req, res) => {
  // TODO : Delete the user with id
  return res.json({ status: "pending" });
});

app.listen(PORT, () => console.log(`Server Started at PORT : ${PORT}`));
