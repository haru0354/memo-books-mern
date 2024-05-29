import express from "express";
import {
  addChapter,
  deleteChapter,
  getAllChapters,
  getChapter,
  updateChapter,
} from "../controllers/chapterController.mjs";

const chapterRouter = express.Router();

chapterRouter.get("/:id", getAllChapters);
chapterRouter.get("/:id/:chapterId", getChapter);
chapterRouter.post("/:id/", addChapter);
chapterRouter.patch("/:id/:chapterId", updateChapter);
chapterRouter.delete("/:id/:chapterId", deleteChapter);

export default chapterRouter;