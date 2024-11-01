const express = require("express");
const router = express.Router();
const {Admin, Course} = require('../db/index');
const adminMiddleware = require('../middleware/admin');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtPassword = process.env.JWT_SECRET;

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);

  await Admin.create({ username, password });
  res.status(201).json({ msg: "admin created successfully" });
});

router.post("/sign-in", async(req, res)=>{
    const {username, password} = req.body;

    const admin = await Admin.findOne({
        username,
        password
    });
    if(admin){
        const token = jwt.sign({username}, jwtPassword);
        res.status(200).json(token)
    }else{
        res.status(404).json({msg: "user not found"});
    }
});

router.post("/createCourse", adminMiddleware, async (req, res) => {
  const { title, description, price } = req.body;
  // console.log(title, description, price);
  await Course.create({
    title,
    description,
    price,
  });
  res.status(200).json({ msg: "course created successfully" });
});

router.get("/getCourses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json(courses);
});

module.exports = router;
