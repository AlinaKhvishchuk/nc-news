exports.getStatus = (req, res) => {
  res.status(200).send({ msg: "API is running!" });
};
