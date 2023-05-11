const {
  fetchTopics,
  fetchArticles,
  selectArticleById,
} = require("./../models/models.js");
const app = require("./../app.js");

exports.getTopics = (req, res, next) => {
  return fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  return fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const article_id = req.params.article_id;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
