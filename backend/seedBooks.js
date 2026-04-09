const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./src/models/Book");

const books = [];

const titles = [
  "Atomic Habits", "The Alchemist", "Deep Work", "Ikigai",
  "Rich Dad Poor Dad", "Think and Grow Rich", "The Power of Habit",
  "Start With Why", "Zero to One", "The Lean Startup"
];

for (let i = 0; i < 100; i++) {
  books.push({
    title: titles[i % titles.length] + " " + (i + 1),
    author: "Author " + (i + 1),
    description: "Sample book description"
  });
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Book.deleteMany(); // optional (clears old books)
    await Book.insertMany(books);

    console.log("100 Books Inserted ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();