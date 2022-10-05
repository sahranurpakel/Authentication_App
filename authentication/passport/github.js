const passport = require("passport");
const GithubStrategies = require("passport-github2");
const User = require("../../models/User");
const keys = require("./keys");

passport.use(
  new GithubStrategies(
    {
      callbackURL: "/auth/github/callback",
      clientID: keys.github.clientId,
      clientSecret: keys.github.clientSecret,
    },
    (accessToken, refreshToekn, profile, done) => {
      console.log(profile._json.login);
      User.findOne({ username: profile.username })
        .lean()
        .then((currentUser) => {
          if (currentUser) {
            console.log("current User : ", currentUser);
            done(null, currentUser);
          } else {
            new User({
              app: profile.provider,
              username: profile.username,
              profile_image: profile.photos[0].value,
            })
              .save()
              .then((newuser) => {
                console.log("newUser : ", newuser);
                done(null, newuser);
              });
          }
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  console.log(user);
  return done(null, user._id.toString());
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    return done(err, user);
  });
});
