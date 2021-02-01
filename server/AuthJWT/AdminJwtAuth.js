const jwt = require("jsonwebtoken");
require("dotenv").config();

const admin__auth = (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    `${process.env.JWT_SECRET}`,
    (err, payload) => {
      console.log("im in");
      if (err) return res.status(404).json({err});
      req.user = payload;
      if(req.user.Role==false) return res.send('Only admin can see this page')
      next();
    }
  );
};

module.exports = admin__auth;