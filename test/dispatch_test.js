"use strict";

var expect = require('chai').expect,          //assertions library
    Dispatch = require('./../lib/dispatch'),//Dispatch constructor
    dispatcher = new Dispatch(),            //construct new dispatch object
    config = {
        alpha: 2                            //sample callback counter
    };

describe('dispatcher', function () {
    var testSequence = [
        {func: testFunc, params:[config]},
        {func: testFunc, params:[config]},
        {func: testFunc, params:[config]},
        {func: doneFunc, params:[config]}];
    it('should dispatch functions', function (done) {
        //Begin dispatch
        //If it doesn't time out, callbacks were successful
        dispatcher.exec(function(){}, done, testSequence);
    });
    it('properly scope variables', function () {
        //testFunc increments counter 3 times (2 + 3 = 5)
        expect(config.alpha).to.be.equal(5);
    });
});

//Test callbacks with variables in another scope
function testFunc(req, res, callback, config) {
    config.alpha++;
    callback();
}

//Terminate test
function doneFunc(req, done, callback) {
    done();
}