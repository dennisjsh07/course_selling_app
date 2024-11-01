const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://dennisjshofficial:HX1rBGL64WumgqCg@testdb.jemdcrd.mongodb.net/course_selling_app"
);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Admin,
    Course,
    User
}