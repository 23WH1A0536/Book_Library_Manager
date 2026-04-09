const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    description: String,
    genre: String   // ✅ NEW FIELD
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);