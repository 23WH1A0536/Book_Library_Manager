const mongoose = require("mongoose");

const readingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReadingList", readingListSchema);
