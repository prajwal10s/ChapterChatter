const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("comment.ejs");
});

module.exports = router;
