const mongoose = require("mongoose");

// Define the book schema
const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    // genre: {
    //   type: String,
    //   required: true,
    // },
    // description: String,
    // publicationYear: Number,
    // publisher: String,
    // pageCount: Number,
    // isbn: {
    //   type: String,
    //   unique: true,
    // },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Create a model from the schema
const books = mongoose.model("books", bookSchema);

module.exports = books;
