const { emailFunc } = require("../authentication/nodemailer");
const bcrypt = require("bcryptjs");
module.exports.getrefresh = (req, res) => {
  if (req.user) {
    email = req.user.email;
  }
  res.render("./site/getEmail", { email });
};
module.exports.postrefresh = (req, res) => {
  email = req.body.email;
  User.findOne({ email })
    .lean()
    .then((user) => {
      if (user) {
        (text = `http://localhost:3000/refresh/password/${user._id}`),
          (subject = "Şifre yenileme talebi"),
          emailFunc(email, text, subject);
        res.render("./site/getEmail");
      } else {
        res.render("./site/getEmail");
      }
    });
};

module.exports.getrefreshId = (req, res) => {
  id = req.params.id;
  res.render("./site/refreshPassword", { id: id });
};

module.exports.postrefreshId = (req, res) => {
  id = req.params.id;
  password = req.body.password;
  password1 = req.body.password1;
  if (password === password1) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) throw err;
        User.findByIdAndUpdate(id, {
          //! hashle
          password: hash,
          verify: true,
        })
          .lean()
          .then((user) => {
            res.redirect("/");
            req.flash("flashSuccess", "Şifre başarıyla değiştirildi");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  } else {
    // ! passwordlar farklı
  }
};
