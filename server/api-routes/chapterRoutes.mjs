import express from "express"
import { getAllChapters, getChapter, updateChapter } from "../controllers/chapterController.mjs"

const chapterRouter = express.Router()

chapterRouter.get('/:id', getAllChapters)
chapterRouter.get('/:id/:chapterId', getChapter)
chapterRouter.patch('/:id/:chapterId', updateChapter)

export default chapterRouter