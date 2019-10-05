const express = require("express");
const fs = require("fs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const mongoSanatize = require("express-mongo-sanitize");
const cookieParser= require("cookie-parser");
var bodyParser = require("body-parser");


const planRouter = require("./router/planRouter.js");
const userRouter = require("./router/userRouter.js");
const viewRouter = require("./router/viewRouter");
const bookingRouter = require("./router/bookingRouter");
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 1000, // allow 1000 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});
app.use(limiter);
app.use(speedLimiter);
app.use(helmet());
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//can use both express & bodyParser
app.use(bodyParser.json());
app.use(cookieParser());
app.use(mongoSanatize());
app.set("view engine", "pug");
app.set("views", "template");
app.use(express.static("public"));

app.use("/", viewRouter);
app.use("/api/plans", planRouter);
app.use("/api/user", userRouter);
app.use("/api/booking",bookingRouter);

app.get("*", (req, res) => {
  res.status(404).send("Error 404 Not Found");
  res.end();
});
module.exports = app;
// const bcrypt= require('bcrypt');
// bcrypt.hash('Ronaldo07',8).then((pass)=>{
//     console.log(pass);
// })
