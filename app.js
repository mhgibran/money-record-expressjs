require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 2728;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static('public'));

var indexRouter = require("./routes/index");
var iconRouter = require("./routes/icon");
var accountRouter = require("./routes/account");

app.use("/", indexRouter);
app.use("/icon", iconRouter);
app.use("/account", accountRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
