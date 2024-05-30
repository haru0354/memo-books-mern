import express from "express"
import { addContents, getAllContents, updateContents } from "../controllers/contentsController.mjs";

const contentsRouter = express.Router();

contentsRouter.get("/:id/:chapterId", getAllContents)
contentsRouter.post("/:id/:chapterId", addContents)
contentsRouter.patch("/:id/:chapterId/:contentsId", updateContents)


export default contentsRouter;