import express from "express"
import bookRouter from "./bookRoutes.mjs"
import chapterRouter from "./chapterRoutes.mjs";

const router = express.Router();

router.use('/book', bookRouter)
router.use('/chapter', chapterRouter)

export default router;