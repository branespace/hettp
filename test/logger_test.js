"use strict";
var expect = require("chai").expect;
var logger = require("./../lib/logger");
var fs = require("fs");


var exLog = { //stub log matching relevant parts of real log
 	method: 'GET',
 	url: '/',
 	origin: '127.0.0.1'
 };

var req = {   //stub req matching relevant parts of real req
	method: 'GET',
	url: '/',
	socket: {
		remoteAddress: '127.0.0.1'
	}
};

var wrapper = {
	config: {
    log: __dirname + '/' + (new Date()).getTime()
  }
};


describe("logger", function(){
	it("should log a request", function(done){
		logger.call(wrapper, req, null, function(){  //remember null is a placeholder for response
      var result = JSON.parse(fs.readFileSync(wrapper.config.log).toString());
      expect(result.url).to.eql(exLog.url);
      expect(result.method).to.eql(exLog.method);
      expect(result.origin).to.eql(exLog.origin);
      done();
		});
	});
  after(function(done){
    fs.unlink(wrapper.config.log, function(){
      done();
    });
  });
});
