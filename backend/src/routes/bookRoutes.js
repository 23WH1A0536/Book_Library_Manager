const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  create,
  getAll,
  getById,
  update,
  remove
} = require("../controllers/bookController");


router.get("/", getAll);
router.get("/:id", getById);

router.post("/", auth, admin, create);
router.put("/:id", auth, admin, update);
router.delete("/:id", auth, admin, remove);

module.exports = router;
