const router = require("express").Router();
const profileController = require("../controller/profileController");
router.get("/profile", profileController.getProfile);
router.put("/profile/:id", profileController.putProfile);
router.get("/logout", profileController.getLogout);

module.exports = router;
