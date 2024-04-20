require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

const connectToMongoDB = require("./connection");
const userModel = require("./models/user");
const userRoute = require("./routes/user");

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.use("/user", userRoute);

connectToMongoDB(process.env.MONGODB_URL).then(() => {
  console.log("Mongo DB connected");
});

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
