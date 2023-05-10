const db = require("./../db/connection");
const fs = require("fs/promises");

exports.fetchStatus = () => {
  return fs.readFile("__endpoints.json", "utf-8");
};
