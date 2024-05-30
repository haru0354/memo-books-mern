import express from "express"
import { addContents, getAllContents } from "../controllers/contentsController.mjs";

const contentsRouter = express.Router();

contentsRouter.get("/:id/:chapterId", getAllContents)
contentsRouter.post("/:id/:chapterId", addContents)

export default contentsRouter;