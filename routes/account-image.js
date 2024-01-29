var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/auth");
const { get, store, update, destroy } = require("../controller/account-image");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/accounts/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", authenticateToken, get);
router.post("/", authenticateToken, upload.single("file"), store);
router.put("/:id", authenticateToken, upload.single("file"), update);
router.delete("/:id", authenticateToken, destroy);

module.exports = router;
