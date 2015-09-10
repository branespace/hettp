"use strict";

module.exports = function Dispatch() {
    var tasks = [],
        config;

    this.use = function use(func) {
        tasks.push(func);
    };

    this.exec = function exec(confObj){
        config = config || confObj;
        if(tasks.length){
            tasks.shift().call(null, config, exec);
        }
        return false;
    };
};