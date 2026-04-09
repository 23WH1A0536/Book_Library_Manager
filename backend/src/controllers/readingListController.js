const ReadingList = require("../models/ReadingList");


exports.getList = async (req, res) => {
  try {
    let list = await ReadingList.findOne({ user: req.user.id })
      .populate("books");

    if (!list) {
      list = await ReadingList.create({ user: req.user.id, books: [] });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    let list = await ReadingList.findOne({ user: req.user.id });

    if (!list) {
      list = await ReadingList.create({
        user: req.user.id,
        books: [bookId]
      });
    } else {
      if (!list.books.includes(bookId)) {
        list.books.push(bookId);
        await list.save();
      }
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.removeBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const list = await ReadingList.findOne({ user: req.user.id });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.books = list.books.filter(
      (b) => b.toString() !== bookId
    );

    await list.save();

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
