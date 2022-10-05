const path = require("path");
const User = require("../models/User");

module.exports.getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
module.exports.getProfile = (req, res) => {
  id = req.user._id;
  User.findById(id)
    .lean()
    .then((user) => {
      res.render("./site/profile", { user });
    });
};
module.exports.putProfile = (req, res) => {
  id = req.params.id;
  if (req.files) {
    profile_image = req.files.profile_image;
    profile_image.mv(
      path.resolve(__dirname, "../public/img/postimages", profile_image.name)
    );
    User.findByIdAndUpdate(id, {
      ...req.body,
      profile_image: `/img/postimages/${profile_image.name}`,
    })
      .lean()
      .then((user) => {
        res.redirect("/profile");
      });
  } else {
    res.redirect("/profile");
  }
};
