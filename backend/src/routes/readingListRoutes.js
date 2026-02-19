const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getList,
  addBook,
  removeBook
} = require("../controllers/readingListController");

router.get("/", auth, getList);
router.post("/add/:bookId", auth, addBook);
router.delete("/remove/:bookId", auth, removeBook);

module.exports = router;
