import express from "express"
import bookRouter from "./bookRoutes.mjs"

const router = express.Router();

router.use('/book', bookRouter)

export default router;