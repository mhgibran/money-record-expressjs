var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/auth");
const { get } = require("../controller/account");

router.get("/", authenticateToken, get);

module.exports = router;
