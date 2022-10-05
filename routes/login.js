const router = require("express").Router();
const passport = require("passport");
const loginController = require("../controller/loginController");
const { checkUser } = require("../middlewares/auth");
require("../authentication/passport/github");
require("../authentication/passport/google");
router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);
router.get("/login/:id", loginController.getLoginId);
router.get("/123456", checkUser, (req, res) => {
  res.send("deneme");
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.locals.appuser = req.user;
    console.log("google callback :: ", req.user);
    res.redirect("/");
  }
);

router.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("/");
  }
);
module.exports = router;
