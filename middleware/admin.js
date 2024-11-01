const { Admin } = require("../db/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const decodedValue = jwt.verify(token, jwtPassword);
  //   console.log(decodedValue.username);

  const admin = Admin.findOne({
    username: decodedValue.username,
  });
  admin.then((value) => {
    if (value) {
      next();
    } else {
      res.status(404).json({
        msg: "user do not exist",
      });
    }
  });
}

module.exports = adminMiddleware;
