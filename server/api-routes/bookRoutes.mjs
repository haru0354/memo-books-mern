import express from "express";
import {
  addBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.mjs";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBook);
bookRouter.post("/", addBook);
bookRouter.patch("/:id", updateBook);


export default bookRouter;
