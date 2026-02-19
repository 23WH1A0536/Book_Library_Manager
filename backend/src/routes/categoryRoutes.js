const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { create, getAll } = require("../controllers/categoryController");

router.get("/", getAll);
router.post("/", auth, admin, create);

module.exports = router;
