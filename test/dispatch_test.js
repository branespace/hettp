"use strict";

var chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    Dispatch = require('./../lib/dispatch'),
    dispatcher = new Dispatch();

describe('dispatch', function(){
    before(function(){
        dispatcher.use(testFunc);
        dispatcher.use(callBackFunc);
    });
    it('should dispatch functions', function(done){
        dispatcher.exec(done);
    });
});

function testFunc(done, callback){
    callback();
}

function callBackFunc(done, callback){
    done();
}