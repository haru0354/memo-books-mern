import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.once('error', function (err) {
  console.error('DBの接続に失敗しました。: ', err);
});

db.once('open', function () {
  console.log('DBに接続しました。');
});

