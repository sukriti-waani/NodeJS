const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      // The data to append: a newline followed by timestamp, IP, HTTP method, and path
      `\n ${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,
      // Callback function executed after append operation completes
      (err, data) => {
        // Call the next middleware or route handler in the stack
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
