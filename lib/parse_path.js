"use strict";

module.exports = function parsePath(req, res, next) {
    var path = req.url,
        url = {},
        regex = /([^:/]*)?(?::\/\/)?(?:(\w+):(\S+)@)?([^:/]*)[:]?(\d+)?([^?]+)[?]?(\S*)#(\S*)/i,
        match = path.match(regex);

    if (match) {
        url.scheme = match[1] || 'http';
        url.user = match[2] || '';
        url.pass = match[3] || '';
        url.host = match[4];
        url.port = match[5] || 80;

        url.path = match[6] || '/';
        url.path = url.path.split('/');
        url.path.shift();
        if (url.path.length === 1) {
            url.path.unshift('/');
        }

        url.queryString = {};
        if (match[7]) {
            var queryMatch = match[7].split('&');
            for (var i = 0; i < queryMatch.length; i++) {
                var elements = queryMatch[i].split('=');
                url.queryString[elements[0]] = decodeURIComponent(elements[1]);
            }
        }

        url.fragment = match[8];

        this.config.url = url;

    }
    next();
};