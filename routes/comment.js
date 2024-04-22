const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const commentModel = require("../models/comment");
const bookModel = require("../models/book");
const userModel = require("../models/user");
const mongoose = require("mongoose");

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
    res.redirect(`/${userRecord._id}`);
  } catch (error) {
    console.error("Error creating new comment:", error.message);
  }

  //return res.redirect("comment");
};

const showAllComments = async (req, res) => {
  try {
    const userId = req.params;
    const user = userModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const comments = await commentModel.find({ createdBy: user._id });
    console.log("Comments start here");
    console.log(comments);
    res.render("showComments", { comments, userName: user.username });
  } catch (error) {
    console.error("Error fetching comments", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//routes..........

router.get("/comment", (req, res) => {
  const username = req.query.username;
  res.locals.username = username;

  res.render("comment");
});

router.post("/comment", handleCreateComment);

router.get("/showComments/:userId", showAllComments);

module.exports = router;
