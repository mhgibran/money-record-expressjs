var express = require("express");
var router = express.Router();
const { login, refreshToken } = require("../controller/auth");
const authenticateToken = require("../middleware/auth");

router.get("/", function (req, res, next) {
  res.sendStatus(404);
});

router.post("/login", login);
router.post("/token", refreshToken);
router.get("/accounts", authenticateToken, );

module.exports = router;
