"use strict";

var server = require('./lib/app');

server.use(require('./lib/logger'), ['test.log']);
server.get('/', function (req, res) {
    res.writer(200, 'text', 'success!');
});

var serv = server.listen(3000);