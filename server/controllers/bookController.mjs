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

export const getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "本が見つかりませんでした。" });
    }

    res.json(book);
  } catch (err) {
    console.error("本の取得に失敗しました", err);
    res.status(500).json({ message: "本の取得に失敗しました。" });
  }
};

export const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const newBook = await book.save();
  
    res.status(201).json(newBook);
  } catch (err) {
    console.log("本の追加に失敗しました。", err);
    res.status(500).json({ message: "本の追加に失敗しました。" });
  }
};
