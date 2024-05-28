import express from "express"
import { getAllBooks } from "../controllers/bookController.mjs";

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks)

export default bookRouter;