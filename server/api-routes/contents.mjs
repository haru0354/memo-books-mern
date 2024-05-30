import express from "express";
import {
  addContents,
  deleteContents,
  getAllContents,
  getContents,
  updateContents,
} from "../controllers/contentsController.mjs";
import { body } from "express-validator";

const contentsRouter = express.Router();

contentsRouter.get("/:id/:chapterId", getAllContents);
contentsRouter.get("/:id/:chapterId/:contentsId", getContents);
contentsRouter.post(
  "/:id/:chapterId",
  body("heading_title").notEmpty().withMessage("タイトルを入力してください。"),
  body("content").notEmpty().withMessage("記載するコンテンツを入力してください。"),
  addContents
);
contentsRouter.patch(
  "/:id/:chapterId/:contentsId",
  body("heading_title").optional().notEmpty(),
  body("content").optional().notEmpty(),
  updateContents
);
contentsRouter.delete("/:id/:chapterId/:contentsId", deleteContents);

export default contentsRouter;
