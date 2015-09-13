var http = require ("http");
var fs = require("fs");

//creates file log for every request
module.exports = function fileLogger(req, res, next, filename) {
  var named = this.config.log || filename;

  var logObj = {
  timestamp: new Date().toUTCString(),
  url:  req.url,
  method: req.method,
  origin: req.socket.remoteAddress
  };

  fs.appendFile(named, JSON.stringify(logObj), function(err){
    if (err){
      throw err;
    }
    next(req, res);
  });
};


