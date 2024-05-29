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
    const book = new Book({ title: req.body.title });
    const newBook = await book.save();

    res.status(201).json(newBook);
  } catch (err) {
    console.log("本の追加に失敗しました。", err);
    res.status(500).json({ message: "本の追加に失敗しました。" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "本が見つかりませんでした。" });
    }
    7;
    if (req.body.title) {
      book.title = req.body.title;
    }

    await book.save();
    res.json(book);
  } catch (err) {
    console.error("本の編集に失敗しました。", err);
    res.status(500).json({ message: "本の編集に失敗しました。" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const result = await Book.deleteOne({ _id: bookId })
  
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "本が見つかりませんでした" });
    }
  
    res.json({ message: "本の削除に成功しました。" });
  } catch (err) {
    console.error("本の削除に失敗しました", err);
    res.status(500).json({ message: "本の削除に失敗しました。"})
  }
};
