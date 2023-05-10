const express = require("express");
const { getStatus } = require("./controllers/getStatus.controllers");
const { getTopics } = require("./controllers/controllers.js");

app = express();
app.get("/api", getStatus);
app.get("/api/topics", getTopics);

module.exports = app;
