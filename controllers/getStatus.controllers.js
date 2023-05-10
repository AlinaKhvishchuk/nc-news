exports.getStatus = (req, res) => {
  return fetchStatus()
    .then((endpoints) => {
      res.status(200).send({ endpoints: endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
