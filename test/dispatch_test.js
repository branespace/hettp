"use strict";

var chai = require('chai').expect,          //assertions library
    Dispatch = require('./../lib/dispatch'),//Dispatch constructor
    dispatcher = new Dispatch(),            //construct new dispatch object
    config = {
        alpha: 2                            //sample callback counter
    };

describe('dispatcher', function(){
    before(function(){
        //Add functions to queue
        dispatcher.use(testFunc);
        dispatcher.use(testFunc);
        dispatcher.use(testFunc);
        dispatcher.use(doneFunc);
    });
    it('should dispatch functions', function(done){
        //Begin dispatch
        //If it doesn't time out, callbacks were successful
        dispatcher.exec(null, done, config);
    });
    it('properly scope variables', function(){
        //testFunc increments counter 3 times (2 + 3 = 5)
        expect(config.alpha).to.be.equal(5);
    });
});

//Test callbacks with variables in another scope
function testFunc(req, res, callback){
    /*jshint validthis:true*/
    this.config.alpha++;
    /*jshint validthis:false*/
    callback(req, res);
}

//Terminate test
function doneFunc(req, res, callback){
    res();
}