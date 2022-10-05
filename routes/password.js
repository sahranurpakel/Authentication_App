const router = require("express").Router();
const passwordController = require("../controller/passwordController");
router.get("/", passwordController.getrefresh);

router.post("/", passwordController.postrefresh);

router.get("/:id", passwordController.getrefreshId);
router.post("/:id", passwordController.postrefreshId);

module.exports = router;
