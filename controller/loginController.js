const passport = require("passport");
const User = require("../models/User");
require("../authentication/passport/local.js");
const { reCap } = require("../helpers/reCaptcha");
const { emailFunc } = require("../authentication/nodemailer");
const bcrypt = require("bcryptjs");
module.exports.getLogin = (req, res) => {
  res.render("./site/login", { reCap });
};

module.exports.postLogin = (req, res, next) => {
  const errors = [];
  username = req.body.username;
  password = req.body.password;
  reCaps = req.body.reCaps;
  reCapDefault = req.body.reCapDefault;
  if (reCaps === reCapDefault) {
    User.findOne({ username })
      .lean()
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              if (!user.verify) {
                (email = user.email),
                  (text = `http://localhost:3000/login/${user._id}`),
                  (subject = "Verify your email"),
                  emailFunc(email, text, subject);
              }
            }
          });
        }
      });
  } else {
    errors.push({ message: "reCaptcha dan geçemediniz" });
    return res.render("./site/login", {
      errors: errors,
      reCap: reCap,
    });
  }

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
  })(req, res, next);
};

module.exports.getLoginId = (req, res, next) => {
  id = req.params.id;
  User.findByIdAndUpdate(id, {
    verify: true,
  })
    .lean()
    .then(() => {
      res.render("./site/verify");
    });
};
