const express = require("express");
const commentModel = require("../models/comment");
const bookModel = require("../models/book");
const userModel = require("../models/user");
const mongoose = require("mongoose");

//controllers
const handleCreateComment = async (req, res) => {
  const { bookName, authorName, chapterNumber, Comment, username } = req.body;
  //console.log(bookName, authorName, chapterNumber, Comment, username);
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
    const newComment = await commentModel.create({
      createdBy: userRecord,
      book: bookRecord,
      chapterNumber,
      prompt: selectedOption,
      comment: Comment,
    });
    res.redirect(`/showComments/${username}`);
  } catch (error) {
    console.error("Error creating new comment:", error.message);
  }

  //return res.redirect("comment");
};

const showAllComments = async (req, res) => {
  try {
    const userNameObj = req.params.username;
    const username = userNameObj.toString();
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const comments = await commentModel.find({ createdBy: user._id });
    res.render("showComments", { comments, userName: user.username });
  } catch (error) {
    console.error("Error fetching comments", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const showFeed = async (req, res) => {
  try {
    const userNameObj = req.params.username;
    const username = userNameObj.toString();
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const feedComments = await commentModel.aggregate([
      {
        $match: {
          createdBy: { $ne: user._id },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users", // Name of the User collection
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
    ]);
    // console.log(feedComments);
    feedComments.forEach((comment) => {
      const createdAt = comment.createdAt;
      // Extracting the date part (first 10 characters) and storing it in a new field called 'dateOnly'
      comment.dateOnly = createdAt.toISOString().substr(0, 10);
    });
    res.render("showFeed", { feedComments, userName: user.username });
  } catch (err) {
    console.error("Error fetching Feed", error.message);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  handleCreateComment,
  showAllComments,
  showFeed,
};
