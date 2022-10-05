const User = require("../models/User");
const checkUser = (req, res, next) => {
  // console.log("middleware", req.user);
  // ! STATU DEGERINI ALMIYOR
  let isAdmin = false,
    staff = false,
    statü,
    name,
    app;

  if (req.user) {
    let id = req.user._id;
    console.log("id ", id);
    User.findById(id)
      .lean()
      .then((user) => {
        name = user.name;
        app = user.app;
        statü = "USER";

        if (id == "63389cd9527ff8a6235a6ba1") {
          console.log("deneme if 1");
          isAdmin = true;
          statü = "ADMIN";
        } else if (id == "633891b93c4dfc89eb2e6490") {
          staff = true;
          statü = "STAFF";
        }

        res.locals = {
          displayLink: {
            user: true,
            name: name,
            isAdmin: isAdmin,
            staff: staff,
            id: id,
            statü: statü,
            app: app,
          },
        };
        console.log(res.locals.displayLink);
        next();
      });
  } else {
    res.locals = {
      displayLink: {
        user: false,
        isAdmin: false,
        staff: false,
      },
    };
    next();
  }
};

module.exports = { checkUser };
