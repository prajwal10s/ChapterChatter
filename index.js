require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const { connectToMongoDB } = require("./connection");
const { userModel } = require("./models/user");

connectToMongoDB(process.env.MONGODB_URL).then(() => {
  console.log("Mongo DB connected");
});

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
