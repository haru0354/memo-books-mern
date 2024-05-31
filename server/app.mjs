import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./helpers/db.mjs";
import apiRoutes from "./api-routes/index.mjs"
import cors from "cors"

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', apiRoutes)


app.use(function(err, req, res, next) {
  if(res.headersSent) {
    return next(err)
  }
  res.status(500).json({ message: "不正なエラーが発生しました。"})
}) 

app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
