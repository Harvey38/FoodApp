const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Email = require("./../utility/sendemail");
const signup = function(req, res) {
  // console.log(req.body+" i was here");
  if (req.body.email != undefined && req.body.password != undefined) {
    // console.log("dsjdj")
    var token = createtoken(req.body.email, req.body.username);
    res.cookie("jwt", token, { httpOnly: true });
    var user = User(req.body)
      .save()
      .then(async doc => {
        console.log(doc);
        const url = "http://localhost:3000/me";
        await new Email(doc, url).sendWelcome();
        res.json({
          document: doc,
          token: token
        });
      })
      .catch(err => {
        console.log(err);
        res.status(403).json({
          error: err
        });
      });
  } else {
    res.status(403).json({
      err: "Email or password cannot be empty"
    });
  }
};
const login = async function(req, res) {
  console.log(req.body, "hjhjhjg");
  User.findOne({ email: req.body.email }).then(doc => {
    if (doc === undefined) {
      res.status(403).json({
        err: "Enter valid email "
      });
    } else {
      var pass = doc.password;
      var value = bcrypt.compare(req.body.password, pass);
      if (value) {
        var email = doc.email;
        var username = doc.username;
        var token = createtoken(email, username);
        res.cookie("jwt", token, { httpOnly: true });
        console.log("User logged in");
        res.json({
          status: "user logged in",
          token: token
        });
      } else {
        res.status(403).json({
          err: "Password incorrect"
        });
      }
    }
  });
};
const authorize = async function(req, res, next) {
  // console.log(req.headers.role);
  if (req.headers.role === "admin" || req.headers.role === "RestaurantOwner") {
    console.log("You are authorised");
    next();
  } else {
    res.status(404).send("You are not authorised");
  }
};
const putupdateid = async function(req, res, next) {
  try {
    const token = req.cookies.jwt;
    var data = await jwt.decode(token, "shebangfkboi");
    console.log("the data is");
    console.log(data);
    const user = await User.findOne({ email: data.email });
    console.log(user);
    req.headers.user = user;
    console.log(req.headers.id);
    next();
  } catch (err) {
    console.log(err);
  }
};
const protectroute = async function(req, res, next) {
  try {
    console.log("in protect route");
    // console.log("afjvfjwf");
    // var token = req.headers.authorization.replace("Bearer ", "")||req.cookies.jwt;
    var token = req.cookies.jwt;
    console.log(token);
    // console.log(token);
    var data = await jwt.verify(token, "shebangfkboi");
    // console.log(data);
    var user = await User.findOne({ email: data["email"] });
    if (user === undefined) {
      res.send(401).json({
        err: "Please enter valid details"
      });
    }
    console.log("You are set to go");
    req.headers.role = user.role;
    next();
  } catch (e) {
    res.send(e);
  }
};
function createtoken(email, username) {
  var token = jwt.sign({ email: email, username: username }, "shebangfkboi", {
    expiresIn: "10d"
  });
  return token;
}
function authorise(...args) {
  let roles = args;
  return function(req, res, next) {
    if (role.includes(req.headers.roles)) {
      next();
    } else {
      res.end("User is not authorised");
    }
  };
}
const forgetPassword = async function(req, res) {
  try {
    // console.log("fh");
    var email = req.body.email;
    // console.log(email);
    if (!email) {
      res.send("Please enter an email to continue");
    }
    var user = await User.findOne({ email: email });
    // console.log(user);
    if (user === undefined) {
      res.status(404).json({ err: "No user of such mail exists" });
    } else {
      // console.log('jhjk');
      const token = user.createresetToken();
      // console.log('egjiwehgiu')
      await user.save({ validateBeforeSave: false });
      // console.log('fhif')
      let message =
        "Your reset token is sent to your email id please send a patch req in order to change your password \n" +
        token;
      //  console.log(message)

      sendmail({
        receiverid: user.email,
        message: message,
        subject: "Token is only for 10 minutes"
      });
      //  console.log('wldfjilwjf')
      res.end();
      // res.json({token:user.resetToken});
    }
  } catch (err) {
    res.send(err);
  }
};
const resetPassword = async function(req, res) {
  try {
    // console.log('fheuf')
    var email = req.body.email;
    var token1 = req.params.token;
    var token = crypto
      .createHash("sha256")
      .update(token1)
      .digest("hex");
    // console.log(token);
    var user = await User.findOne({ email: email });
    // console.log(user.resetToken)
    if (user.resetToken != token) {
      res.json({
        err: "The token does not match."
      });
    } else {
      user.password = req.body.password;
      user.confirmpassword = req.body.confirmpassword;
      user.resetToken = undefined;
      user.expiresIn = undefined;
      user.save();
      res.send(user);
    }
  } catch (err) {
    res.send(err);
  }
};
const logout = async function(req, res) {
  res.cookie("jwt", "Logged out", {
    expires: new Date(Date.now() * 20),
    httpOnly: true
  });
  res.status(201).json({
    status: "user logged out"
  });
};
const isLoggedin = async function(req, res, next) {
  try {
    if (req.cookies.jwt) {
      var token = req.cookies.jwt;
      console.log(token);
      var decode = await jwt.verify(token, "shebangfkboi");
      if (!decode) {
        return next();
      }
      console.log(decode);
      const user = await User.find({ email: decode.email });
      if (!user) {
        return next();
      }
      req.headers.role = user.role;
      res.locals.user = user;
      return next();
    } else {
      return next();
    }
  } catch (err) {
    // console.log(err);
    next();
  }
};

module.exports = {
  signup,
  login,
  protectroute,
  authorize,
  authorise,
  forgetPassword,
  resetPassword,
  isLoggedin,
  logout,
  putupdateid
};
