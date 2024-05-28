import express from "express";
import {
  addBook,
  getAllBooks,
  getBook,
} from "../controllers/bookController.mjs";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBook);
bookRouter.post("/", addBook);

export default bookRouter;
