const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./src/config/db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/books", require("./src/routes/bookRoutes"));
const readingListRoutes = require("./src/routes/readingListRoutes");

app.use("/api/reading-list", readingListRoutes);


app.get("/", (req, res) => {
  res.send("ShelfMaster Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
