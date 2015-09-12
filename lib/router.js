"use strict";

var Dispatch = require('./dispatch');
var dispatch = new Dispatch();

exports.Router = Router;

function Router() {
    this.routes = {
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {}
    };

    this.handle404 = {};
}

Router.prototype.err404 = function err404(callback) {
    this.handle404 = callback;
};

Router.prototype.use = function use(middleware) {
    dispatch.use(middleware);
};

Router.prototype.get = function get(route, callback) {
    this.routes.GET[route] = callback;
};

Router.prototype.post = function post(route, callback) {
    this.routes.POST[route] = callback;
};

Router.prototype.put = function put(route, callback) {
    this.routes.PUT[route] = callback;
};

Router.prototype.patch = function patch(route, callback) {
    this.routes.PATCH[route] = callback;
};

Router.prototype.del = function del(route, callback) {
    this.routes.DELETE[route] = callback;
};

Router.prototype.route = function (req, res) {
    var slicedUrl = this.routes
        [req.method]
        [req.url.slice(0, req.url.lastIndexOf('/') || req.url.length)];
    if (slicedUrl) {
        dispatch.use(slicedUrl);
        dispatch.exec(res, res, {});
    } else {
        this.handle404(req, res);
    }
};