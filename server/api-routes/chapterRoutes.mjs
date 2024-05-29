import express from "express"
import { getAllChapters, getChapter } from "../controllers/chapterController.mjs"

const chapterRouter = express.Router()

chapterRouter.get('/:id', getAllChapters)
chapterRouter.get('/:id/:chapterId', getChapter)

export default chapterRouter