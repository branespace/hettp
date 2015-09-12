"use strict";

var Router = new require('./../lib/router').Router,
    expect = require('chai').expect;

describe('router', function(){
    it('should route a url oto the correct endpoint', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notes',
            method: 'GET'
        };
        router.err404(errorEmitted);
        router.get('/notes', routerTest);
        router.route(wrapper, done);
    });
    it('should route to the default url', function(done){
        var router = new Router();
        var wrapper = {
            url: '/notess',
            method: 'GET'
        };
        router.err404(errorEmitted);
        router.get('/notes', routerTest);
        router.route(wrapper, done);
    });
});

function routerTest(req, done){
    done();
}

function errorEmitted(req, done){
    done();
}