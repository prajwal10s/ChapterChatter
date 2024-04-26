const express = require("express");
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
  return res.redirect("/showComments/" + findUser.username);
};

module.exports = {
  handleCreateUser,
  handleLoginUser,
};
