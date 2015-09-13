//response is being loaded like middleware, will be loaded as generic
//on server initialization

module.exports = function response(req, res, next) {
    var mediaType = {               //basic media types
      "JSON": "application/JSON",
      "text": "text/plain",
      "HTML": "text/html"
    };

    //this writer can be used to create custom responses
    res.writer = function writer(code, type, body){
      this.writeHead(code, {"Content-Type": mediaType[type]});
      if(body){
        this.write(body);
      }
      this.end();
    };

    //basic 404
    res.write404 = function write404(type, body) {
      this.writer(404, type, body);
    };

    //basic 200
    res.write200 = function write200(type, body) {
      this.writer(200, type, body);
    };

    //useful for other codes, like various 500s
    res.send = function send(code, type, body){
      this.writer(code, type, body);
    };
    next();
    //500 code for server error handled elsewhere, framework users don't need it.
};