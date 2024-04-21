require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const path = require("path");
const app = express();
const session = require("express-session");
const commentRoute = require("./routes/comment.js");
const connectToMongoDB = require("./connection");
const userModel = require("./models/user");
const bookModel = require("./models/book");
const userRoute = require("./routes/user");
const { execArgv } = require("process");

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: "ChapterChatter",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// const isLoggedIn = (req, res, next) => {
//   if (req.session.user) {
//     console.log(`User ${user.username} already logged in`);
//   } else {
//     console.log(`User not logged in`);
//   }
//   next();
// };

// app.use(isLoggedIn);

connectToMongoDB(process.env.MONGODB_URL).then(() => {
  console.log("Mongo DB connected");
});

app.use("/comment", commentRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
