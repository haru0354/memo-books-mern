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

chapterRouter.get("/:id", requestErrorHandler(getAllChapters));

chapterRouter.get("/:id/:chapterId", requestErrorHandler(getChapter));

chapterRouter.post(
  "/:id/",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(addChapter)
);

chapterRouter.patch(
  "/:id/:chapterId",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  requestErrorHandler(updateChapter)
);

chapterRouter.delete("/:id/:chapterId", requestErrorHandler(deleteChapter));

export default chapterRouter;
