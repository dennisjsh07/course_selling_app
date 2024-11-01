const { Router } = require("express");
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_SECRET;

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

router.post("/sign-in", async(req, res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({
        username
    });
    if(user){
        const token = jwt.sign({username}, jwtPassword);
        res.status(200).json(token);
    }else{
        res.status(404).json({msg: 'user not found'});
    }
})

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
