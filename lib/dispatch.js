"use strict";

/*Dispatch provides functionality to run multiple asynchronous functions
  in sequence.  These functions can use the express.js style middleware
  interface.
  */
module.exports = function Dispatch() {
    var self = this;    //hold scope reference

    this.processQueue = null;   //Queue for middleware and route
    this.res = null;            //Hold response object
    this.req = null;            //Hold request object

    //Execute queue / dispatch callbacks
    this.exec = function exec(req, res, routeQueue){
        self.config = self.config || {};    //Read config object
        self.processQueue = self.processQueue || routeQueue;
        var queue = self.processQueue;
        self.req = self.req || req;
        self.res = self.res || res;

        if(queue.length){                   //If we are still in our queue
            var params = queue[0].params;   //Set our params
            queue.shift().func              //Call our first queue task
                .apply(self, [].concat.apply([self.req, self.res, self.exec],params));
        }
        return false;   //Begin teardown
    };
};