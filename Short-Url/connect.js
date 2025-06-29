const mongoose = require("mongoose");

// an async function to connect to MongoDB using a given connection URL
async function connectToMongoDB(url) {
  // Return the result of mongoose.connect, which returns a promise
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};
