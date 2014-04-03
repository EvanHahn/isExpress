var isExpress = require('../');

var express = require('express');
var connect = require('connect');
var request = require('supertest');
var assert = require('assert');

describe('isExpress', function() {

  var expressApp;
  var connectApp;
  beforeEach(function() {
    expressApp = express();
    connectApp = connect();
    [expressApp, connectApp].forEach(function(app) {
      app.use(function(req, res) {
        var reqIs = isExpress(req);
        var resIs = isExpress(res);
        res.end(reqIs.toString() + ' ' + resIs.toString());
      });
    });
  });

  it('properly detects an Express app', function(done) {
    request(expressApp).get('/').expect('true true', done);
  });

  it('properly detects a non-Express app', function(done) {
    request(connectApp).get('/').expect('false false', done);
  });

  it('returns false when you pass it bad input', function() {
    assert(!isExpress());
    assert(!isExpress(null));
    assert(!isExpress(123));
    assert(!isExpress(123, 456));
    assert(!isExpress(true));
    assert(!isExpress(false));
    assert(!isExpress({ app: 'woah' }));
    assert(!isExpress({ app: connect() }));
    assert(!isExpress({ app: express() }));
  });

});
