import express from "express";
import {
  addChapter,
  deleteChapter,
  getAllChapters,
  getChapter,
  updateChapter,
} from "../controllers/chapterController.mjs";
import { body } from "express-validator";

const chapterRouter = express.Router();

chapterRouter.get("/:id", getAllChapters);
chapterRouter.get("/:id/:chapterId", getChapter);
chapterRouter.post(
  "/:id/",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  addChapter
);
chapterRouter.patch(
  "/:id/:chapterId",
  body("chapter_title").notEmpty().withMessage("タイトルを入力してください。"),
  updateChapter
);
chapterRouter.delete("/:id/:chapterId", deleteChapter);

export default chapterRouter;
