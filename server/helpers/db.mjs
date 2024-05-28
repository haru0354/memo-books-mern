import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.once('error', function (err) {
  console.error('connection error: ', err);
});

db.once('open', function () {
  console.log('Connected to MongoDB');
});

