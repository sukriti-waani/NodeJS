// Import the built-in 'http' module to create the server
const http = require("http");

// Import the built-in 'fs' (file system) module to handle file operations
const fs = require("fs");

// Import the built-in 'url' module to parse URL strings
const url = require("url");

// Create an HTTP server that listens for incoming requests
const myServer = http.createServer((req, res) => {
  // Ignore requests for the favicon (browser automatically requests /favicon.ico)
  if (req.url === "/favicon.ico") return res.end();

  // Create a log entry string with the current timestamp and requested URL
  const log = `${Date.now()}: ${req.url} New Request Received \n`;

  // Parse the request URL into an object (includes pathname and query parameters)
  const myUrl = url.parse(req.url, true);

  // Output the parsed URL object to the console for debugging
  console.log(myUrl);

  // Append the log entry to 'log.txt' asynchronously
  fs.appendFile("log.txt", log, (err) => {
    // If there is an error writing the log, print the error
    if (err) {
      console.error("Log write failed", err);
    }
  });

  // Check the pathname and respond accordingly
  switch (myUrl.pathname) {
    // If the path is '/', respond with 'HomePage'
    case "/":
      res.end("HomePage");
      break;

    // If the path is '/about', extract 'myname' query parameter and greet the user
    case "/about":
      const username = myUrl.query.myname; // e.g. /about?myname=Sukriti => username = "Sukriti"
      res.end(`Welcome, ${username}`);
      break;

    // If the path is '/search', extract 'search_query' query parameter and show results
    case "/search":
      const search = myUrl.query.search_query; // e.g. /search?search_query=nodejs => search = "nodejs"
      res.end("Here are your results for " + search);
      break;

    // For any other path, respond with 404 Not Found
    default:
      res.end("404 Not Found");
  }
});

// Start the server and listen on port 8000
myServer.listen(8000, () => console.log("Server Started"));
