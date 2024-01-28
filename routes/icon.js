var express = require("express");
var router = express.Router();
const authenticateToken = require("../middleware/auth");
const { get, store, update, destroy } = require("../controller/icon");
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
router.post("/", upload.single("file"), store);
router.put("/:id", upload.single("file"), update);
router.delete("/:id", destroy);

module.exports = router;
