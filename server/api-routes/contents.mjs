import express from "express"
import { getAllContents } from "../controllers/contentsController.mjs";

const contentsRouter = express.Router();

contentsRouter.get("/:id/:chapterId", getAllContents)

export default contentsRouter;