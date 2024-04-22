const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const commentModel = require("../models/comment");
const bookModel = require("../models/book");
const userModel = require("../models/user");

//controllers
const handleCreateComment = async (req, res) => {
  const { bookName, authorName, chapterNumber, Comment, username } = req.body;
  console.log(bookName, authorName, chapterNumber, Comment, username);
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
    const userRecord = await userModel.findOne({
      username,
    });
    console.log(userRecord);
    const newComment = await commentModel.create({
      createdBy: userRecord,
      book: bookRecord,
      chapterNumber,
      prompt: selectedOption,
      comment: Comment,
    });
  } catch (error) {
    console.error("Error creating new comment:", error.message);
  }
  res.redirect(`/comment?username=${username}`);
  //return res.redirect("comment");
};

router.get("/", (req, res) => {
  const username = req.query.username;
  res.locals.username = username;

  res.render("comment");
});

router.post("/", handleCreateComment);
module.exports = router;
