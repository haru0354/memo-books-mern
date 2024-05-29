import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.mjs";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBook);
bookRouter.post("/", addBook);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);


export default bookRouter;
