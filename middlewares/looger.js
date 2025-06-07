//  Q3. Middleware to log method and URL
//  Q7. Append request logs to access.log

const fs = require('fs');
const path = require('path');

module.exports = function logger(req, res, next) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile(path.join(__dirname, '../access.log'), log, err => {
    if (err) console.error('Failed to write log:', err);
  });
  console.log(log.trim());
  next();
};
