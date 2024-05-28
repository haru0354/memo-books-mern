import express from "express"
import { getAllBooks, getBook } from "../controllers/bookController.mjs";

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getBook)

export default bookRouter;