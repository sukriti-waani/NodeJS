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
  // const log = `${Date.now()}: ${req.url} New Request Received \n`;

  // Create a log entry string that records details about the incoming request
  const log = `${Date.now()}: ${req.method} ${req.url} New Request Received \n`;
  // Explanation:
  // `${Date.now()}` → gets the current timestamp in milliseconds since Jan 1, 1970 (used to know exactly when the request happened)

  // `${req.method}` → gets the HTTP method of the request (e.g., GET, POST, PUT, DELETE) — tells what kind of action the client wants

  // `${req.url}` → gets the full URL path that was requested by the client (e.g., /about, /signup?name=abc)

  // Parse the request URL into an object (includes pathname and query parameters)
  const myUrl = url.parse(req.url, true);

  // // Output the parsed URL object to the console for debugging
  // console.log(myUrl);

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
      if (req.method === "GET") res.end("HomePage");
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

    case "/signup":
      // Check if the HTTP method of the request is GET
      if (req.method === "GET")
        // If it's a GET request, respond with a message that simulates showing a signup form
        res.end("This is a Signup Form");
      // If the HTTP method is POST (usually when form data is submitted)
      else if (req.method === "POST") {
        // Here we would normally handle the database query to save the signup details
        // Db Query
        // After "processing" the signup data, respond with a success message
        res.end("Signup Successfull");
      }
      break;

    // For any other path, respond with 404 Not Found
    default:
      res.end("404 Not Found");
  }
});

// Start the server and listen on port 8000
myServer.listen(8000, () => console.log("Server Started"));



// Aspect	                            GET	                                         POST
// Purpose	                        Retrieve data	                            Send (submit) data
// Where is data sent?	          URL query string	                              Request body
// Visibility	                    Visible in URL	                            Hidden from URL
// Cacheable?	                Yes (can be cached by browsers)           	  No (usually not cached)
// Data size	                    Limited (URL length)	                     No practical limit (larger data allowed)
// Use cases	                  Search, read-only fetches	                   Form submissions, updates