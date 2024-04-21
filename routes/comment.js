const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const commentModel = require("../models/comment");
const bookModel = require("../models/book");

//controllers
const handleCreateComment = async (req, res) => {
  const { bookName, authorName, chapterNumber } = req.body;
  console.log(bookName, authorName, chapterNumber);
  const selectedOption = req.body.Prompt;
  try {
    const book = await bookModel.findOne({
      bookName,
      authorName,
    });
    if (!book) {
      const newBook = await bookModel.create({
        bookName,
        authorName,
      });
      console.log("new book created!!");
    } else {
      console.log("book already exists");
    }
  } catch (error) {
    console.error("Error fetching/creating book:", error.message);
  }
  try {
    const bookRecord = await bookModel.findOne({
      bookName,
      authorName,
    });
    const newComment = await commentModel.create({
      book: bookRecord,
      chapterNumber,
      prompt: selectedOption,
    });
  } catch (error) {
    console.error("Error creating new comment:", error.message);
  }
  res.redirect("comment");
};

router.get("/", (req, res) => {
  res.render("comment.ejs");
});
router.post("/", handleCreateComment);
module.exports = router;
