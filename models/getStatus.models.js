const db = require("./../db/connection");
const fs = require("fs/promises");

exports.fetchStatus = () => {
  return fs.readFile("endpoints.json", "utf-8").then((result) => {
    const endpoints = JSON.parse(result);
    return endpoints;
  });
};
