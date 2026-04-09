const Book = require("../models/Book");
console.log("BOOK SCHEMA:", Book.schema.obj);

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
    const books = await Book.find(); // ❌ removed populate
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Book By ID
exports.getById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // ❌ removed populate

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("UPDATE HIT:", req.body);

    const { title, author, description, genre } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // ✅ FORCE assign values
    book.title = title;
    book.author = author;
    book.description = description;

    // 🔥 IMPORTANT LINE
    book.set("genre", genre);

    // ✅ FORCE SAVE
    await book.save();

    // 🔍 VERIFY IMMEDIATELY
    const updated = await Book.findById(req.params.id);
    console.log("UPDATED DOC:", updated);

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*// ✅ Update Book
exports.update = async (req, res) => {
  try {
    console.log("UPDATE HIT:", req.body);
    const { title, author, description, genre } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          author,
          description,
          genre
        }
      },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
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