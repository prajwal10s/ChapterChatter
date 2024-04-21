const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

//controllers
const handleCreateUser = async (req, res) => {
  const { fullname, username, password } = req.body;
  //find whether user already exists
  const findUser = await userModel.findOne({ username });
  if (findUser) {
    console.log(`User ${username} already exists`);
  } else {
    await userModel.create({
      username,
      fullname,
      password,
    });
  }
  return res.redirect("login");
};

const handleLoginUser = async (req, res) => {
  const { username, password } = req.body;
  //console.log(username);
  if (!username || !password) {
    return res.redirect("/login");
  }

  const findUser = await userModel.findOne({ username, password });
  if (!findUser) {
    return res
      .status(400)
      .json({ status: "error", msg: "Either username or pwd is incorrect!" });
  }
  return res.render("comment", { user: findUser });
};

//routes..........

//render signup page
router.get("/signup", (req, res) => {
  return res.render("signup");
});

//create user into db and redirect to login page
router.post("/createUser", handleCreateUser);

//render login page
router.get("/login", (req, res) => {
  return res.render("login");
});

//authenticate and render comment page
router.post("/login", handleLoginUser);

module.exports = router;
