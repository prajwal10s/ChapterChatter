const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users", // Reference to the users model
    // },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books", // Reference to the books model
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const comments = mongoose.model("comments", commentSchema);
module.exports = comments;
