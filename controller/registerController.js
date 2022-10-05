const formValidation = require("../validation/formValidation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const path = require("path");
module.exports.getRegister = (req, res) => {
  res.render("./site/register");
};
module.exports.postRegister = (req, res) => {
  const errors = [];
  const username = req.body.username;
  const password = req.body.password;
  const profile_image = req.files.profile_image;

  profile_image.mv(
    path.resolve(__dirname, "../public/img/postimages", profile_image.name)
  );

  console.log(req.body);
  const validationErrors = formValidation.registerValidation(req.body);
  if (validationErrors.length > 0) {
    return res.render("./site/register", {
      errors: validationErrors,
    });
  }
  User.findOne({ username })
    .lean()
    .then((user) => {
      if (user) {
        errors.push({ message: "Username already in use" });
        return res.render("./site/register", {
          errors: errors,
        });
      }
      // burada hashlenmiş şekilde db ye kayıt ettik
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw err;
          User.create({
            ...req.body,
            app: "local",
            profile_image: `/img/postimages/${profile_image.name}`,
            password: hash,
          })
            .then(() => {
              req.flash("flashSuccess", "Successfully Registered");
              res.redirect("/");
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
};
