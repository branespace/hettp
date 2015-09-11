"use strict";

/*Dispatch provides functionality to run multiple asynchronous functions
  in sequence.  These functions can use the express.js style middleware
  interface.
  */
module.exports = function Dispatch() {
    var tasks = [],     //task queue
        self = this;    //hold scope reference

    //Register task in queue
    this.use = function use(func) {
        tasks.push(func);
    };

    //Execute queue / dispatch callbacks
    this.exec = function exec(req, res, confObj){
        self.config = self.config || confObj;   //Read config object
        if(tasks.length){
            tasks.shift().call(self, req, res, exec);   //Call callback
        }
        return false;   //Begin teardown
    };
};