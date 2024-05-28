import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Book } from "./models/book.mjs";
import "./helpers/db.mjs";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
