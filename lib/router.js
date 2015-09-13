"use strict";

var Dispatch = require('./dispatch');
module.exports = Router;
var resp = require('./response');

function Router() {
    this.routes = {     //Holds route and middleware
        GET: {},
        POST: {},
        PUT: {},
        PATCH: {},
        DELETE: {}
    };

    this.tasks = [{func: resp, pararms: null}];    //Processqueue
}

//handles default route (no matched url)
Router.prototype.default = function def(callback) {
    this.default = callback;
};

//Adds middleware to all undefined routes, or to specifc route
// Route and method are optional, but method must be included if route is
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

//Assign route to GET handler
Router.prototype.get = function get(route, callback) {
    this.assignRoute('GET', route, callback);
};

//Assign route to POST handler
Router.prototype.post = function post(route, callback) {
    this.assignRoute('POST', route, callback);
};

//Assign route to PUT handler
Router.prototype.put = function put(route, callback) {
    this.assignRoute('PUT', route, callback);
};

//Assign route to PATCH handler
Router.prototype.patch = function patch(route, callback) {
    this.assignRoute('PATCH', route, callback);
};

//Assign route to DELETE handler
Router.prototype.del = function del(route, callback) {
    this.assignRoute('DELETE', route, callback);
};

//Assign middleware and route
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

//Route request to specified callback with middleware
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