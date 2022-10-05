const express = require("express");
const engine = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/generateDate").generateDate;
const { if_eq } = require("./helpers/if_eq");

const app = express();
require("dotenv").config();
require("./src/databaseConnection");

const port = process.env.PORT || 5000;

// * Flash middleware
const maxAge = 60 * 60 * 24 * 1000;

app.use(cookieparser("cookie"));
app.use(
  session({
    cookie: { maxAge: maxAge },
    resave: true,
    secret: "cookie",
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/AuthenticationApp",
      ttl: 14 * 24 * 60 * 60,
    }),
    secure: false,
  })
);
app.use(flash());
// ! passport js initialize
app.use(passport.initialize());
app.use(passport.session());
// ! Global flash middleware
app.use((req, res, next) => {
  res.locals.flashSuccess = req.flash("flashSuccess");
  res.locals.flashErr = req.flash("error");
  res.locals.flashSuc = req.flash("success");
  next();
});
app.use(fileUpload());
app.use(express.static("public"));
app.use(methodOverride("_method"));
// * handlebars
app.engine(
  "handlebars",
  engine.engine({
    helpers: {
      generateDate: generateDate,
      if_eq: if_eq,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");
// * bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// * routes
const mainRoute = require("./routes/main");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const passwordRoutes = require("./routes/password");
const profileRoutes = require("./routes/profile");
const { checkUser } = require("./middlewares/auth");
const { authUsers } = require("./middlewares/authorization");
app.get("/*", checkUser);
app.use("/", mainRoute);
app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/refresh/password", authUsers, passwordRoutes);
app.use("/", authUsers, profileRoutes);

app.listen(port, () => {
  console.log(`Server listening : http://localhost:${port}`);
});
