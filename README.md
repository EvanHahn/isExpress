isExpress
=========

Given `req` and `res`, is it an Express app? A simple function.

Installation:

    $ npm install is-express

Usage:

```javascript
var isExpress = require("is-express");

var express = require("express");
var http = require("http");

function handler(req, res) {
  if (isExpress(req)) {
    res.end("It's Express!");
  } else {
    res.end("It's not Express!");
  }
}

var expressApp = express();
expressApp.use(handler);

var httpApp = http.createServer(handler);

expressApp.listen(8000);
httpApp.listen(9000);
```

This isn't really intended for use in a real app -- it's more for library developers. For example, I wanted to make some middleware that acted differently if the app was built on Express.
