const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  handleCreateComment,
  showAllComments,
  showFeed,
} = require("../controllers/comment");

//routes..........

router.get("/comment", (req, res) => {
  const username = req.query.username;
  res.locals.username = username;
  res.render("comment");
});

router.post("/comment", handleCreateComment);

router.get("/showComments/:username", showAllComments);

router.get("/feed/:username", showFeed);
module.exports = router;
