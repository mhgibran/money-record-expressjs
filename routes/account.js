var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/auth");
const { get, store, show, update, destroy } = require("../controller/account");
const { accountValidateSchema } = require("../validation/account");

router.get("/", authenticateToken, get);
router.post("/", accountValidateSchema, authenticateToken, store);
router.get("/:id", authenticateToken, show);
router.put("/:id", accountValidateSchema, authenticateToken, update);
router.delete("/:id", authenticateToken, destroy);

module.exports = router;
