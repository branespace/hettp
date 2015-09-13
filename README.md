hettp
=============
![build status](https://travis-ci.org/branespace/hettp.svg?branch=master)

A basic and lightweight framework of useful features for the node HTTP engine.

Because what's lighter than [He]?

Dependencies:
    None

How to use:

1. Install by npm with:


    `npm install hettp`


2. Create a server.js file and require hettp:


    `var server = require('hettp');`
    
    
3. Add some middleware with server.use:


    `server.use(logger);`
    
    
4. Add some routes with server[method] and add a callback:
 

    `server.get('/', rootGET)`
   
   
5. Start the server with server.listen(port):


    `server.listen(3000);`
