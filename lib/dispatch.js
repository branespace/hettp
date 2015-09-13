"use strict";

/*Dispatch provides functionality to run multiple asynchronous functions
  in sequence.  These functions can use the express.js style middleware
  interface.
  */
module.exports = function Dispatch() {
    var self = this;    //hold scope reference

    this.processQueue = null;
    this.res = null;
    this.req = null;

    //Execute queue / dispatch callbacks
    this.exec = function exec(req, res, routeQueue){
        self.config = self.config || {};   //Read config object
        self.processQueue = self.processQueue || routeQueue;
        var queue = self.processQueue;
        self.req = self.req || req;
        self.res = self.res || res;

        if(queue.length){
            var params = queue[0].params;
            queue.shift().func
                .apply(self, [].concat.apply([self.req, self.res, self.exec],params));
        }
        return false;   //Begin teardown
    };
};