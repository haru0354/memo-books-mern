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

bookRouter.get("/", requestErrorHandler(getAllBooks));

bookRouter.get("/:id", requestErrorHandler(getBook));

bookRouter.post(
  "/",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(addBook)
);

bookRouter.patch(
  "/:id",
  body("title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(updateBook)
);

bookRouter.delete("/:id", requestErrorHandler(deleteBook));

export default bookRouter;
