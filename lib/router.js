"use strict";

var Dispatch = require('./dispatch');
module.exports = Router;

function Router() {
    this.routes = {
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {}
    };

    this.tasks = [];
}

Router.prototype.default = function def(callback) {
    this.default = callback;
};

Router.prototype.use = function use(middleware, params, route, method) {
    if(route && method){
        this.routes[method][route] = this.routes[method][route] || {};
        this.routes[method][route].tasks = this.routes[method][route] || [];
        this.routes[method][route].tasks.
            push({func: middleware, params: params});
    } else {
        this.tasks.push({func: middleware, params: params});
    }
};

Router.prototype.get = function get(route, callback) {
    this.assignRoute('GET', route, callback);
};

Router.prototype.post = function post(route, callback) {
    this.assignRoute('POST', route, callback);
};

Router.prototype.put = function put(route, callback) {
    this.assignRoute('PUT', route, callback);
};

Router.prototype.patch = function patch(route, callback) {
    this.assignRoute('PATCH', route, callback);
};

Router.prototype.del = function del(route, callback) {
    this.assignRoute('DELETE', route, callback);
};

Router.prototype.assignRoute = function (method, route, callback){
    this.routes[method][route] = this.routes[method][route] || {};
    this.routes[method][route].callback = callback;

    if (this.routes[method][route].tasks) {

        this.routes[method][route].tasks =
            this.tasks.concat(this.routes[method][route].tasks);

    } else {
        this.routes[method][route].tasks = this.tasks.slice();
    }
};

Router.prototype.route = function (req, res) {
    var path = this.routes
        [req.method]
        [req.url.slice(0, req.url.lastIndexOf('/') || req.url.length)];

    if (path) {
        var dispatch = new Dispatch();
        var tasks = path.tasks.slice();
        tasks.push({func: path.callback});
        dispatch.exec(res, res, tasks);
    } else {
        if(this.default){
            this.default(req, res);
        }
    }
};