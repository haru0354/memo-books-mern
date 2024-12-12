import express from "express";
import {
  addContents,
  deleteContents,
  getAllContents,
  getContents,
  updateContents,
} from "../controllers/contentsController.mjs";
import { body } from "express-validator";
import { requestErrorHandler } from "../helpers/requestErrorHandler.mjs";

const contentsRouter = express.Router();

contentsRouter.get("/:bookId/:chapterId", requestErrorHandler(getAllContents));

contentsRouter.get("/:bookId/:chapterId/:contentsId", requestErrorHandler(getContents));

contentsRouter.post(
  "/:bookId/:chapterId",
  body("heading_title").notEmpty().withMessage("タイトルを入力してください。"),
  body("content").notEmpty().withMessage("記載するコンテンツを入力してください。"),
  requestErrorHandler(addContents)
);

contentsRouter.patch(
  "/:bookId/:chapterId/:contentsId",
  body("heading_title").optional().notEmpty(),
  body("content").optional().notEmpty(),
  requestErrorHandler(updateContents)
);

contentsRouter.delete("/:userId/:bookId/:chapterId/:contentsId", requestErrorHandler(deleteContents));

export default contentsRouter;
