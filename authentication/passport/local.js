const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err, null, "Bir Hata Olustu");

      if (!user) return done(null, false, "Kullanıcı Bulunamadı");

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user, { message: "SUCCESFULLY LOGGED IN" });
        } else {
          return done(null, false, { message: "INCORRECT PASSWORD" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  console.log("user : seri ", user);
  return done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});
