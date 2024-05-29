import express from "express"
import { addChapter, getAllChapters, getChapter, updateChapter } from "../controllers/chapterController.mjs"

const chapterRouter = express.Router()

chapterRouter.get('/:id', getAllChapters)
chapterRouter.get('/:id/:chapterId', getChapter)
chapterRouter.post('/:id/', addChapter)

chapterRouter.patch('/:id/:chapterId', updateChapter)

export default chapterRouter