const isExpress = require(".");

const express = require("express");
const connect = require("connect");
const request = require("supertest");
const test = require("node:test");
const assert = require("node:assert/strict");

test("detecting an Express app", async () => {
  const app = express().use(requestHandler);
  await request(app).get("/").expect("true true");
});

test("detecting a non-Express app", async () => {
  const app = connect().use(requestHandler);
  await request(app).get("/").expect("false false");
});

test("passing bogus inputs", () => {
  assert(!isExpress());
  assert(!isExpress(null));
  assert(!isExpress(123));
  assert(!isExpress(123, 456));
  assert(!isExpress(true));
  assert(!isExpress(false));
  assert(!isExpress({ app: "woah" }));
  assert(!isExpress({ app: connect() }));
  assert(!isExpress({ app: express() }));
});

function requestHandler(req, res) {
  res.end(`${isExpress(req)} ${isExpress(res)}`);
}
