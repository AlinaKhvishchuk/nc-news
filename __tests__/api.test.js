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
