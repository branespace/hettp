var http = require ("http");
var fs = require("fs");


module.exports = function fileLogger(req, res, next) {
  var named = this.config.log;

  var logObj = {
  timestamp: new Date().toUTCString(),
  url:  req.url,
  method: req.method,
  origin: req.socket.remoteAddress
  };

  fs.appendFile(named, JSON.stringify(logObj), function(err){ //name for now is date
    if (err){
      throw err;
    }
    next(req, res);
  });
};


