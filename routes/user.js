const { Router } = require("express");
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

const router = Router();

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  await User.create({
    username,
    password,
  });
  res.status(200).json({ msg: "user created successfully" });
});

router.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses);
});

router.post("/courses/:id", userMiddleware, async (req, res) => {
  const cid = req.params.id;
  const username = req.headers.username;
  // console.log(cid,username);
  await User.updateOne(
    {
      username,
    },
    {
        $push: {
            purchasedCourses: cid
        }
    }
  );
  res.status(200).json({msg: 'course purchased successfully'});
});

router.get('/purchasedCourses', userMiddleware, async(req, res)=>{
    const username = req.headers.username;

    const user = await User.findOne({
        username
    });
    // console.log(user.purchasedCourses);
    const purchasedCourses = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    })
    res.status(200).json(purchasedCourses);
})

module.exports = router;
