require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const path = require("path");
const app = express();
const commentRoute = require("./routes/comment.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectToMongoDB = require("./connection");
const userModel = require("./models/user");
const bookModel = require("./models/book");
const commentModel = require("./models/comment");
const userRoute = require("./routes/user");

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

connectToMongoDB(process.env.MONGODB_URL).then(() => {
  console.log("Mongo DB connected");
});

app.use("/comment", commentRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
