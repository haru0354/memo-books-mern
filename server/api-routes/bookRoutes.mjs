import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/bookController.mjs";
import { body } from "express-validator";
import { requestErrorHandler } from "../helpers/requestErrorHandler.mjs";

const bookRouter = express.Router();

bookRouter.get("/:userId", requestErrorHandler(getAllBooks));

bookRouter.get("/:userId/:bookId", requestErrorHandler(getBook));

bookRouter.post(
  "/:userId",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(addBook)
);

bookRouter.patch(
  "/:userId/:bookId",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(updateBook)
);

bookRouter.delete("/:userId/:bookId", requestErrorHandler(deleteBook));

export default bookRouter;
