var expect = require('chai').expect;
var response = require('./../lib/response');

//dummy-stub res object for testing
var res = {
  done: null,
  writeHead: function(code, contentObj) {
    expect(code).to.eql(200);
    expect(contentObj).to.eql({"Content-Type": "text/plain"});
  },
  write: function(body){
    expect(body).to.eql("success");
  },
  end: function(){
  this.done();
  }
};


describe('response helpers', function(){
  before(function(done){
    response(null, res, function(){
      done();
    });
  });
  it('should write the head, body if applicable, and call end', function(done){
    res.done = done;
    res.writer(200, "text", 'success');
  });
});


