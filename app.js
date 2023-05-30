const cors = require("cors");
const express = require("express");
const { getStatus } = require("./controllers/getStatus.controllers");
const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postComment,
  patchVotes,
  deleteComment,
  getUsers,
} = require("./controllers/controllers.js");
const app = express();
app.use(cors({ origin: "*" }));

// app.use(cors());

app.use(express.json());

app.get("/api", getStatus);
app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchVotes);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getUsers);

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Author Not found" });
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
