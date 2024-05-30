import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.mjs";
import { body } from "express-validator";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBook);
bookRouter.post(
  "/",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  addBook
);
bookRouter.patch(
  "/:id",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  updateBook
);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
