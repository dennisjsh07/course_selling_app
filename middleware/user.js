const { User } = require("../db/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decodedValue = jwt.verify(token, jwtPassword);
  const user = User.findOne({
    username: decodedValue.username
  });
  user.then((value) => {
    if (value) {
      next();
    } else {
      res.status(404).json({ msg: "user not found" });
    }
  });
}

module.exports = userMiddleware;
