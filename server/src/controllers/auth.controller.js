const User = require("../models/User");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

const secret = "ILoveToHideStuff";

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save user in db",
      });
    }
    res.json(user);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "This Email does not Exist",
      });
    }
    console.log(user.authenticate(password));
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and passowrd does not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, secret);

    res.cookie("token", token, { expire: new Date() + 999 });

    const { _id, username, email } = user;

    return res.json({
      token,
      user: { _id, username, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json([
    {
      message: "signedOut",
    },
  ]);
};

exports.isSignedIn = expressJwt({
  secret: secret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};
