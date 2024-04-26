const express = require("express");
const router = express.Router();
const { handleCreateUser, handleLoginUser } = require("../controllers/user");
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
