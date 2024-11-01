const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(400).json('something went wrong');
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
