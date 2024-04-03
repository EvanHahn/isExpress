var express;
try {
  express = require("express");
} catch (err) {
  // Ignored
}

if (express) {
  var http = require("http");
  var expectedProto = express().__proto__;

  module.exports = function isExpress(check) {
    if (!check) {
      return false;
    } else if (typeof check.app !== "function") {
      return false;
    } else if (check.app.__proto__ !== expectedProto) {
      return false;
    } else if (
      !(check instanceof http.IncomingMessage) &&
      !(check instanceof http.OutgoingMessage)
    ) {
      return false;
    } else {
      return true;
    }
  };
} else {
  module.exports = function isExpress() {
    return false;
  };
}
