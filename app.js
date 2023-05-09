const express = require("express");
const { getStatus } = require("./controllers/getStatus.controllers");
const { getTopics } = require("./controllers/controllers.js");

app = express();
app.get("/api", getStatus);
app.get("/api/topics", getTopics);

app.get("/api/error", (req, res, next) => {
  next(new Error("Something went wrong!"));
});
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: "Server err! We are sorry!" });
  }
});

module.exports = app;
