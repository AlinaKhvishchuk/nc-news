const app = require("./app.js");

app.listen(9999, (err) => {
  if (err) console.log(err);
  else {
    console.log("Listening on 9999");
  }
});
