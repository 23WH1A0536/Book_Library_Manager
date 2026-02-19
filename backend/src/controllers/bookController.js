const Book = require("../models/Book");


// ✅ Create Book (Admin)
exports.create = async (req, res) => {
  try {
    const { title, author, description, category } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      category
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get All Books
exports.getAll = async (req, res) => {
  try {
    const books = await Book.find().populate("category");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Get Book By ID
exports.getById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("category");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Update Book
exports.update = async (req, res) => {
  try {
    const { title, author, description, category } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, category },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

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
