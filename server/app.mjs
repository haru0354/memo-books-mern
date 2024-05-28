import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./helpers/db.mjs";
import apiRoutes from "./api-routes/index.mjs"

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
