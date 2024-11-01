const { User } = require("../db/index");

function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  // console.log(username, password);
  const user = User.findOne({
    username,
    password,
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
