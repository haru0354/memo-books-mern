import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Book } from "./models/book.mjs";
import "./helpers/db.mjs"

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));

getAllBooks();
async function getAllBooks() {
  try {
    const books = await Book.find();
    console.log(books);
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
