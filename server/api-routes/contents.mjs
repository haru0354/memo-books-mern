import express from "express"
import { addContents, deleteContents, getAllContents, updateContents } from "../controllers/contentsController.mjs";

const contentsRouter = express.Router();

contentsRouter.get("/:id/:chapterId", getAllContents)
contentsRouter.post("/:id/:chapterId", addContents)
contentsRouter.patch("/:id/:chapterId/:contentsId", updateContents)
contentsRouter.delete("/:id/:chapterId/:contentsId", deleteContents)


export default contentsRouter;