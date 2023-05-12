const db = require("./../db/connection");
const {
  checkArticleIdExists,
  checkCommentIdExists,
} = require("./../db/seeds/utils");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url
  ORDER BY articles.created_at DESC;
  `
    )
    .then((result) => {
      return result.rows;
    });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return result.rows[0];
    });
};

exports.selectCommentsById = (article_id) => {
  return checkArticleIdExists(article_id)
    .then(() => {
      return db.query(
        `SELECT comment_id, votes, created_at, author, body, article_id
  FROM comments
  WHERE article_id = $1
  ORDER BY created_at DESC;`,
        [article_id]
      );
    })
    .then((result) => {
      return result.rows;
    });
};

exports.createComment = (article_id, newComment) => {
  const { username, body } = newComment;
  return checkArticleIdExists(article_id)
    .then(() => {
      return db.query(
        `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *`,
        [body, username, article_id]
      );
    })
    .then((result) => {
      return result.rows[0];
    });
};

exports.removeComment = (comment_id) => {
  return checkCommentIdExists(comment_id)
    .then(() => {
      return db.query(`DELETE FROM comments WHERE comment_id = $1`, [
        comment_id,
      ]);
    })
    .then((result) => {
      return null;
    });
};
