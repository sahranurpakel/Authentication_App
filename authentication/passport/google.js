const passport = require("passport");
const GoogleStrategies = require("passport-google-oauth20");
const User = require("../../models/User");
const keys = require("./keys");

passport.use(
  new GoogleStrategies(
    {
      //options of google
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      await User.findOne({ email: profile.emails[0].value })
        .lean()
        .then((user) => {
          if (user) {
            // console.log(user);
            done(null, user, { message: "Kullanıcı girişi yapıldı" });
          } else {
            new User({
              username: profile.id,
              app: profile.provider,
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              profile_image: profile.photos[0].value,
            })
              .save()
              .then((user) => {
                console.log("new user created : " + user);
                done(null, user, { message: "Kullanıcı girişi yapıldı" });
              });
          }
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});
