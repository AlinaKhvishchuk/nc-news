const request = require("supertest");
const app = require("./../app");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("./../db/data/test-data/index");
const testData = require("./../db/data/test-data/index.js");

const seed = require("./../db/seeds/seed");
const db = require("./../db/connection");
const jestSorted = require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  db.end();
});

describe("GET /api ", () => {
  it("GET status: 200", () => {
    return request(app).get("/api").expect(200);
  });

  it("should respond with JSON object", () => {
    const testEndpoints = {
      "GET /api": {
        description:
          "serves up a json representation of all the available endpoints of the api",
      },
      "GET /api/topics": {
        description: "serves an array of all topics",
        queries: [],
        exampleResponse: {
          topics: [{ slug: "football", description: "Footie!" }],
        },
      },
      "GET /api/articles": {
        description: "serves an array of all topics",
        queries: ["author", "topic", "sort_by", "order"],
        exampleResponse: {
          articles: [
            {
              title: "Seafood substitutions are increasing",
              topic: "cooking",
              author: "weegembump",
              body: "Text from the article..",
              created_at: "2018-05-30T15:59:13.341Z",
              votes: 0,
              comment_count: 6,
            },
          ],
        },
      },
    };
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toEqual(testEndpoints);
      });
  });
});

describe("GET /api/topics", () => {
  it("GET status: 200 responds with an array of topic objects, each of which should have slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
        response.body.topics.forEach((topic) => {
          const { slug, description } = topic;
          expect(typeof slug).toBe("string");
          expect(typeof description).toBe("string");
        });
      });
  });

  it("GET status: 404, returns error msg if the page is not found", () => {
    return request(app).get("/api/gibberish").expect(404);
  });
});

describe("GET/api/articles", () => {
  it("GET status: 200, responds with an array of objects, each of which should have the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(12);
        response.body.articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
          expect(article).not.toHaveProperty("body");
        });
      });
  });

  it("GET status: 200, sorts by `created_at` in descending order ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSorted({
          descending: true,
          key: "created_at",
        });
      });
  });
});

describe("GET/api/articles/:articles_id", () => {
  it("GET status: 200, responds with an object and have properties of author, title, article_id, body, topic, created_at, votes, article_img_url", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article).toHaveProperty("author");
        expect(response.body.article).toHaveProperty("title");
        expect(response.body.article).toHaveProperty("article_id");
        expect(response.body.article).toHaveProperty("body");
        expect(response.body.article).toHaveProperty("topic");
        expect(response.body.article).toHaveProperty("created_at");
        expect(response.body.article).toHaveProperty("votes");
        expect(response.body.article).toHaveProperty("article_img_url");
      });
  });

  it("GET status: 200, responds with an object, that contains correct values of selected keys", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        expect(response.body.article.author).toBe("icellusedkars");
        expect(response.body.article.title).toBe("Sony Vaio; or, The Laptop");
      });
  });

  it("GET status: 404, responds with an error msg `Not found` if there is no such article_id", () => {
    return request(app)
      .get("/api/articles/200")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });

  it("GET status: 400, responds with an error msg `Bad request` if there article_id is not of valid type", () => {
    return request(app)
      .get("/api/articles/2g")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("GET status: 200, responds with an array of comment objects, each of which should have the following properties:comment_id, votes, created_at, author, body, article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments.length).toBe(11);
        response.body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });

  it("GET status: 200, sorts by `created_at` in descending order", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toBeSorted({
          descending: true,
          key: "created_at",
        });
      });
  });

  it("GET status: 404, responds with an error msg `Not found` if there is no such article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not found");
      });
  });

  it("GET status: 400, responds with an error msg `Bad request` if there article_id is not of valid type", () => {
    return request(app)
      .get("/api/articles/2g/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });
});
