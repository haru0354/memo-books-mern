import express from "express";
import {
  addChapter,
  deleteChapter,
  getAllChapters,
  getChapter,
  updateChapter,
} from "../controllers/chapterController.mjs";
import { body } from "express-validator";
import { requestErrorHandler } from "../helpers/requestErrorHandler.mjs";

const chapterRouter = express.Router();

chapterRouter.get("/:bookId", requestErrorHandler(getAllChapters));

chapterRouter.get("/:userId/:bookId/:chapterId", requestErrorHandler(getChapter));

chapterRouter.post(
  "/:bookId/",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(addChapter)
);

chapterRouter.patch(
  "/:bookId/:chapterId",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(updateChapter)
);

chapterRouter.delete("/:bookId/:chapterId", requestErrorHandler(deleteChapter));

export default chapterRouter;
