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
  test("responds with a JSON object containing a 'msg' property and status code 200", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((response) => {
        expect(response.body).toEqual({ msg: "API is running!" });
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

  it("GET status: 500, returns error msg in case of server err ", () => {
    return request(app)
      .get("/api/error")
      .expect(500)
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body.msg).toBe("Server err! We are sorry!");
      });
  });
});
