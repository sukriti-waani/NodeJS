const fs = require("fs");
const os = require("os");

// // Sync (Blocking)
// fs.writeFileSync("./text.txt", "Hello World");

// // Async (Non - Blocking Request)
// fs.writeFile("./text.txt", "Hello World", (err) => {});


// Blocking
// console.log("1");
// const result = fs.readFileSync("contacts.txt", "utf8");
// console.log(result);
// console.log("2");

// Non - Blocking
console.log("1");
fs.readFile("contacts.txt", "utf8", (err, result) => {
  console.log(result);
});
console.log("2");

// Default Thread Pool Size = 4
// Max ? - 8core cpu - 8
// console.log(os.cpus().length)