// Import the 'fs' (File System) module built into Node.js
const fs = require("fs");

// ==================== Synchronous Write Example ====================

// This line would synchronously write the string "Hey There" to 'text.txt'.
// If 'text.txt' already exists, it will overwrite its content.
// Execution will block here until the write completes.
// fs.writeFileSync("./text.txt", "Hey There");

// ==================== Asynchronous Write Example ====================

// This writes "Hey There Async" followed by a newline to 'text.txt' asynchronously.
// If 'text.txt' exists, it will overwrite the file's content.
// The function takes a callback to handle success or error.
fs.writeFile("./text.txt", "Hey There Async\n", (err) => {
  if (err) {
    // If an error occurred during writing, print the error message.
    console.log("Write Error:", err);
  } else {
    // If write was successful, print confirmation.
    console.log("Async write completed");
  }
});

// ==================== Synchronous Read Example ====================

// This would synchronously read the contents of 'contacts.txt' in UTF-8 encoding.
// The content would be returned as a string and stored in the 'result' variable.
// Since it's synchronous, execution pauses until reading finishes.
// const result = fs.readFileSync("./contacts.txt", "utf-8");

// This would print the content read from 'contacts.txt' to the console.
// console.log(result);

// ==================== Asynchronous Read Example ====================

// This would asynchronously read 'contacts.txt' in UTF-8 encoding.
// The callback handles the read result or error.
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     // Print error if reading failed (e.g., file not found).
//     console.log("Read Error:", err);
//   } else {
//     // Print the file content if successful.
//     console.log(result);
//   }
// });

// ==================== Synchronous Append Example ====================

try {
  // Append the current date and time (in locale string format) followed by a newline to 'text.txt'.
  // If 'text.txt' does not exist, it will be created.
  // This is a blocking operation — execution pauses until appending finishes.
  fs.appendFileSync("./text.txt", new Date().toLocaleString() + "\n");

  // If append was successful, print confirmation message.
  console.log("Date appended successfully");
} catch (err) {
  // If an error occurred during appending (e.g., permission issues), print error.
  console.log("Append Error:", err);
}

// copy a file
// fs.copyFileSync('text.txt', 'copy.txt');

// To delete a file
// fs.unlinkSync('copy.txt');

console.log(fs.statSync("./text.txt"));

// To create a folder
fs.mkdirSync("my-docs");