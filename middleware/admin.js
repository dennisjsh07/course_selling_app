const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  // console.log(username, password);
  const admin = Admin.findOne({
    username,
    password,
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
