import express from "express"
import { getAllChapters } from "../controllers/chapterController.mjs"

const chapterRouter = express.Router()

chapterRouter.get('/:id', getAllChapters)

export default chapterRouter