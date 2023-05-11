const express = require("express");
const { getStatus } = require("./controllers/getStatus.controllers");
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/controllers.js");

app = express();
app.get("/api", getStatus);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server err" });
});
module.exports = app;
