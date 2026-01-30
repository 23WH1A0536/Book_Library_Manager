const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    description: {
      type: String
    },
    coverImageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
