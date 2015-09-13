var mediaType = {
  "JSON": "application/JSON",
  "text": "text/plain",
  "HTML": "text/html"
};

res.prototype.writer = function writeAll(code, type, body){
  this.writeHead(code, {"Content-Type": mediaType[type]});
  if(body){
    this.write(body);
  }
  this.end();
};

res.prototype.write404 = function write404(type, body) {
  this.writer(404, type, body);
};

res.prototype.write200 = function write200(type, body) {
  this.writer(200, type, body);
};

res.prototype.send = function send(code, type, body){
  this.writer(code, type, body);
};
