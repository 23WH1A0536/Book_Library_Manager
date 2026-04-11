const Book = require("../models/Book");

// ✅ Create Book
exports.create = async (req, res) => {
  try {
    const { title, author, description, genre } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      genre
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Books
exports.getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Book By ID
exports.getById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Book (FINAL FIXED VERSION)
exports.update = async (req, res) => {
  try {
    const { title, author, description, genre } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ✅ Update fields safely
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (description !== undefined) book.description = description;
    if (genre !== undefined) book.genre = genre;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Book
exports.remove = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};