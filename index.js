let express;
try {
  express = require("express");
} catch (err) {
  // Ignored
}

if (express) {
  const http = require("http");
  const expectedProto = Object.getPrototypeOf(express());
  module.exports = function isExpress(value) {
    return Boolean(
      (value instanceof http.IncomingMessage ||
        value instanceof http.OutgoingMessage) &&
        typeof value.app === "function" &&
        Object.getPrototypeOf(value.app) === expectedProto,
    );
  };
} else {
  module.exports = function isExpress() {
    return false;
  };
}
