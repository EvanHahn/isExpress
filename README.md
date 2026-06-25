# isExpress

Given `req` and `res`, is it an Express app? A simple function.

Usage:

```javascript
const isExpress = require("is-express");

const express = require("express");
const http = require("node:http");

function handler(req, res) {
  if (isExpress(req)) {
    res.end("It's Express!");
  } else {
    res.end("It's not Express!");
  }
}

const expressApp = express();
expressApp.use(handler);

const httpApp = http.createServer(handler);

expressApp.listen(8000);
httpApp.listen(9000);
```

This isn't really intended for use in a real app—it's more for library developers. For example, I wanted to make some middleware that acted differently if the app was built on Express.
