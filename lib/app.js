'use strict';

var Router = require('./router'),   //Define our router
    router = Router(),              //Instantiate the router
    http = require('http');         //HTTP module for server

module.exports = {
    //return new server instance
    listen: function listen(port) {
        return http.createServer(router.route).listen(port);
    },
    //assign universal or route middleware
    use: function use(middleware, params, route, method) {
        router.use(middleware, params, route, method);
    },
    //default routing path
    def: function def(callback) {
        router.default(callback);
    },
    //assign handler to GET route
    get: function get(route, callback){
        router.get(route, callback);
    },
    //assign handler to POST route
    post: function post(route, callback){
        router.post(route, callback);
    },
    //assign handler to PUT route
    put: function put(route, callback){
        router.put(route, callback);
    },
    //assign handler to PATCH route
    patch: function patch(route, callback){
        router.patch(route, callback);
    },
    //assign handler to DELETE route
    del: function del(route, callback){
        router.del(route, callback);
    }
};