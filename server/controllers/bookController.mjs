import { Book } from "../models/book.mjs";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("本の一覧の取得に失敗しました。:", err);
    res.status(500).json({ message: "本の一覧の取得に失敗しました。" });
  }
};
