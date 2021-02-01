const jwt = require("jsonwebtoken");
require("dotenv").config();

const user__auth = (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    `${process.env.JWT_SECRET}`,
    (err, payload) => {
      console.log("im in", payload);
      if (err) return res.status(404).json("only users can see this page.");
      req.user = payload;
      console.log(req.user)
      next();
    }
  );
};

module.exports = user__auth;
