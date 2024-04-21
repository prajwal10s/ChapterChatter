const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the users model
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books", // Reference to the books model
    },
  },
  {
    timestamps: true,
  }
);
