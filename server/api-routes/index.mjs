import express from "express"
import bookRouter from "./bookRoutes.mjs"
import chapterRouter from "./chapterRoutes.mjs";
import contentsRouter from "./contents.mjs";

const router = express.Router();

router.use('/book', bookRouter)
router.use('/chapter', chapterRouter)
router.use('/contents', contentsRouter)

export default router;