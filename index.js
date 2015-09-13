"use strict";

var server = require('./lib/app');

server.get('/', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write('success!');
    res.end();
});

var serv = server.listen(3000);