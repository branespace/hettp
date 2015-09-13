"use strict";

var Router = new require('./../lib/router'),
    expect = require('chai').expect;

describe('router', function(){
    it('should route a url oto the correct endpoint', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notes',
            method: 'GET'
        };
        router.default(errorEmitted);
        router.get('/notes', routerTest);
        router.route(wrapper, done);
    });
    it('should route to the default url', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notess',
            method: 'GET'
        };
        router.default(errorEmitted);
        router.get('/notes', routerTest);
        router.route(wrapper, done);
    });
    it('should handle more complex urls', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notes/tango/spark',
            method: 'GET'
        };
        router.get('/notes/tango', routerTest2);
        router.route(wrapper, done);
    });
    it('should process through middleware', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notes/tango/spark',
            method: 'GET'
        };
        router.use(routerTest3);
        router.get('/notes/tango', routerTest2);
        router.route(wrapper, done);
    });
});

function routerTest(req, done){
    done();
}

function errorEmitted(req, done){
    done();
}

function routerTest2(req, done){
    done();
}

function routerTest3(req, done, next){
    next();
}