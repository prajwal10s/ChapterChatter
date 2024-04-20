const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const app = express();
const path = require("path");
require("dotenv").config();
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
mongoose.connect(process.env.MONGODB_URL);
const bookRoute = require("./routes/comment.js");
app.use("", bookRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port : ${process.env.PORT}`);
});
