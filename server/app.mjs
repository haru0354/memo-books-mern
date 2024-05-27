import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server start: http://localhost:${port}`);
})