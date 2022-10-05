const authUsers = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).send({
      message: "Auth failed",
    });
  }
};
module.exports = { authUsers };
