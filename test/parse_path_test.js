"use strict";

var expect = require('chai').expect,
    parsePath = require('./../lib/parse_path');

describe('path parser middleware', function () {
    var path = 'http://localhost:3000/greet/name/fish/3425?q=something&r=what#fragment';
    var req = {
        url: path
    };
    it('should parse a path correctly', function (done) {
        var wrapper = {
            config: {}
        };
        var expected = {
            scheme: 'http',
            user: '',
            pass: '',
            host: 'localhost',
            port: '3000',
            path: ['greet', 'name', 'fish', '3425'],
            queryString: {q: 'something', r: 'what'},
            fragment: 'fragment'
        };

        parsePath.call(wrapper, req, null, function () {
            expect(wrapper.config.url).to.be.deep.equal(expected);
            done();
        });
    });
});